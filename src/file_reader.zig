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

fn trim_whitespace(buffer: []u8) []const u8{
    var start: usize = 0;
    var end: usize = buffer.len; 

    while (start < end and (buffer[start] == ' ' or buffer[start] == '\t')) {
        start += 1;
    }
    while (start < end and (buffer[start] == ' ' or buffer[start] == '\t')) {
        end += 1;
    }

    return buffer[start..end];
}

fn find_char(buffer: []u8, delimiter: u8) !usize {
    for (buffer, 0..) |character, index| {
        if (character == delimiter) return index;
    }
    return ProductParseError.NewLineNotFound;
}

fn parse_url(buffer: []u8) !void {
    var name_index: usize = 0;
    var pattern_start_index: usize = 0;
    for (buffer, 0..) | character, index | {
        if (character == '|') {
            if (name_index == 0) name_index = index
            else if (pattern_start_index == 0) pattern_start_index = index
            else return ProductParseError.TooManyDelimitersFound;
        }
    }
    if (name_index == 0 or pattern_start_index == 0) return ProductParseError.DelimitersNotFound;
}

pub fn parse_file(io: std.Io) !void {
    const dir = std.Io.Dir.cwd();
    var file = try dir.openFile(io, "pages.config", .{ .mode = .read_only });
    defer file.close(io);

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
                print("huh ", .{});
                print("{d}\n", .{new_line_index});
                strip_buffer(&read_buffer, 1, &used);
            }
            else if (read_buffer[0] == '[') {
                const product_name: []const u8 = parse_name(read_buffer[0..new_line_index], &name_buffer) catch |err| {
                    if (err ==
                        ProductParseError.EndingDelimiterNotFound) continue else return err;
                };
                std.debug.print("{s}\n", .{product_name});
                strip_buffer(&read_buffer, new_line_index + 1, &used);
            } else {
                try parse_url(read_buffer[0..new_line_index]);
                strip_buffer(&read_buffer, new_line_index + 1, &used);
            }
        }
    }
}







