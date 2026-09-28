const std = @import("std");
const print = std.debug.print;
const extract = @import("extract.zig");

const ProductParseError = error{
    InvalidProductNameDelimiter,
    EndingDelimiterNotFound,
    ProductNameTooLong,
    NewLineNotFound,
    TooManyDelimitersFound,
    DelimitersNotFound,
    UrlWithoutProduct,
    InvalidMinorValue,
};

fn strip_buffer(buffer: []u8, consumed: usize, used: *usize) void {
    const remaining = used.* - consumed;
    std.mem.copyForwards(u8, buffer[0..remaining], buffer[consumed..used.*]);
    used.* = remaining;
}

fn parse_name(buffer: []u8, output_buffer: []u8) ![]const u8 {
    if (buffer[0] != '[') return ProductParseError.InvalidProductNameDelimiter;
    for (buffer[1..], 0..) |character, index| {
        if (index == output_buffer.len) return ProductParseError.ProductNameTooLong;
        if (character == ']') return output_buffer[0..index];
        output_buffer[index] = character;
    }
    return ProductParseError.EndingDelimiterNotFound;
}

fn trim_whitespace(buffer: []u8) []const u8 {
    var start: usize = 0;
    var end: usize = buffer.len;

    while (start < end and (buffer[start] == ' ' or buffer[start] == '\t')) {
        start += 1;
    }
    while (start < end and (buffer[end - 1] == ' ' or buffer[end - 1] == '\t')) {
        end -= 1;
    }

    return buffer[start..end];
}

fn find_char(buffer: []u8, delimiter: u8) !usize {
    for (buffer, 0..) |character, index| {
        if (character == delimiter) return index;
    }
    return ProductParseError.NewLineNotFound;
}

fn parse_is_minor(buffer: []const u8) !bool {
    if (buffer.len == 4 and buffer[0] == 't' and buffer[1] == 'r' and buffer[2] == 'u' and buffer[3] == 'e') {
        return true;
    }
    if (buffer.len == 5 and buffer[0] == 'f' and buffer[1] == 'a' and buffer[2] == 'l' and buffer[3] == 's' and buffer[4] == 'e') {
        return false;
    }
    return ProductParseError.InvalidMinorValue;
}

fn parse_url(buffer: []u8, allocator: std.mem.Allocator) !extract.ProductUrl {
    var delimiter_indexes: [4]usize = undefined;
    var delimiter_count: usize = 0;
    for (buffer, 0..) |character, index| {
        if (character == '|') {
            if (delimiter_count == delimiter_indexes.len) return ProductParseError.TooManyDelimitersFound;
            delimiter_indexes[delimiter_count] = index;
            delimiter_count += 1;
        }
    }
    if (delimiter_count < 2) return ProductParseError.DelimitersNotFound;

    const pattern_end_end = if (delimiter_count > 2) delimiter_indexes[2] else buffer.len;
    var currency: []const u8 = "AUD";
    var is_minor = false;

    if (delimiter_count > 2) {
        const currency_end = if (delimiter_count > 3) delimiter_indexes[3] else buffer.len;
        currency = try allocator.dupe(u8, trim_whitespace(buffer[delimiter_indexes[2] + 1 .. currency_end]));
    }
    if (delimiter_count > 3) {
        is_minor = try parse_is_minor(trim_whitespace(buffer[delimiter_indexes[3] + 1 ..]));
    }

    return .{
        .url = try allocator.dupe(u8, trim_whitespace(buffer[0..delimiter_indexes[0]])),
        .pattern_start = try allocator.dupe(u8, trim_whitespace(buffer[delimiter_indexes[0] + 1 .. delimiter_indexes[1]])),
        .pattern_end = try allocator.dupe(u8, trim_whitespace(buffer[delimiter_indexes[1] + 1 .. pattern_end_end])),
        .currency = currency,
        .is_minor = is_minor,
    };
}

test "parse_url uses defaults for optional fields" {
    var buffer = "https://example.com | data-price=\" | \"".*;
    const url = try parse_url(&buffer, std.testing.allocator);
    defer std.testing.allocator.free(url.url);
    defer std.testing.allocator.free(url.pattern_start);
    defer std.testing.allocator.free(url.pattern_end);

    try std.testing.expectEqualStrings("AUD", url.currency);
    try std.testing.expect(!url.is_minor);
}

pub fn parse_file(io: std.Io, allocator: std.mem.Allocator) ![]extract.Product {
    const dir = std.Io.Dir.cwd();
    var file = try dir.openFile(io, "pages.config", .{ .mode = .read_only });
    defer file.close(io);

    var products: []extract.Product = &.{};

    var read_buffer: [1024]u8 = undefined;
    var name_buffer: [256]u8 = undefined;

    var offset: usize = 0;
    var used: usize = 0;
    var new_line_index: usize = 0;

    while (true) {
        const bytes_read = try file.readPositionalAll(io, read_buffer[used..], offset);
        if (bytes_read == 0) { // EOF
            break;
        }
        offset += bytes_read;
        used += bytes_read;

        while (true) {
            new_line_index = find_char(read_buffer[0..used], '\n') catch break;
            if (new_line_index == 0) {
                strip_buffer(&read_buffer, 1, &used);
            } else if (read_buffer[0] == '[') {
                const name: []const u8 = try parse_name(read_buffer[0..new_line_index], &name_buffer);
                const product_name = try allocator.dupe(u8, name);
                products = try allocator.realloc(products, products.len + 1);
                const product: extract.Product = extract.Product.init_product(product_name);
                products[products.len - 1] = product;

                strip_buffer(&read_buffer, new_line_index + 1, &used);
            } else {
                if (products.len == 0) {
                    return ProductParseError.UrlWithoutProduct;
                }
                const product_url: extract.ProductUrl = try parse_url(read_buffer[0..new_line_index], allocator);
                try products[products.len - 1].add_url(product_url, allocator);
                strip_buffer(&read_buffer, new_line_index + 1, &used);
            }
        }
    }
    return products;
}
