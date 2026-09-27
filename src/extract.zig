const std = @import("std");
const http = @import("html.zig");
const expect = std.testing.expect;
const expectEqual = std.testing.expectEqual;
const expectEqualStrings = std.testing.expectEqualStrings;
const expectError = std.testing.expectError;

pub const ProductUrl = struct {
    url: []const u8,
    pattern_start: []const u8,
    pattern_end: []const u8,
    currency: []const u8 = "AUD",
    is_minor: bool = false,
};

pub const Product = struct {
    name: []const u8,
    urls: []ProductUrl = &.{},
    pub fn init_product(name: []const u8) Product {
        return .{ .name = name };
    }

    pub fn add_url(self: *Product, new_url: ProductUrl, allocator: std.mem.Allocator) !void {
        const urls_len = self.urls.len;
        if (urls_len == 0) {
            self.urls = try allocator.alloc(ProductUrl, 1);
        } else {
            self.urls = try allocator.realloc(self.urls, urls_len + 1);
        }

        self.urls[urls_len] = new_url;
    }

    pub fn deinit(self: *Product, allocator: std.mem.Allocator) void {
        allocator.free(self.urls);
    }
};

fn get_price(body: []u8, url: *const ProductUrl) ![]u8 {
    const start: usize = std.mem.indexOf(u8, body, url.pattern_start) orelse return error.InvalidPrice;
    const price_start = start + url.pattern_start.len;
    const price_end = std.mem.indexOfPos(u8, body, price_start, url.pattern_end) orelse return error.InvalidPrice;
    const price = body[price_start..price_end];
    return price;
}

fn format_price(price: []u8) []u8 {
    var formatted_price = if (price.len > 0 and price[0] == '$') price[1..] else price;
    var write_index: usize = 0;

    for (formatted_price) |character| {
        if (character == ',') continue;

        formatted_price[write_index] = character;
        write_index += 1;
    }

    return formatted_price[0..write_index];
}

fn convert_price(price: []u8, is_minor: bool) !i32 {
    var converted_price_f16: f32 = try std.fmt.parseFloat(f32, price);
    if (!is_minor) {
        converted_price_f16 *= 100;
    }

    const converted_price: i32 = @intFromFloat(converted_price_f16);
    return converted_price;
}

pub fn extract(product: *Product, io: std.Io, allocator: std.mem.Allocator) !void {
    std.debug.print("Name: {s}\n", .{product.*.name});
    for (product.*.urls) |url| {
        const body = try http.get_page_content(url.url, allocator, io);
        var price_str = try get_price(body, &url);
        price_str = format_price(price_str);
        std.debug.print("Price from page: ${s}\n", .{price_str});
        const price: i32 = try convert_price(price_str, url.is_minor);
        std.debug.print("Minor Price: {d}\n", .{price});
    }
    std.debug.print("\n", .{});
}

// Tests ----

test "Product initializes with no URLs" {
    const product = Product.init_product("Headphones");

    try expectEqualStrings("Headphones", product.name);
    try expectEqual(@as(usize, 0), product.urls.len);
}

test "Product adds URLs in order" {
    var product = Product.init_product("Headphones");
    defer product.deinit(std.testing.allocator);

    try product.add_url(.{
        .url = "https://example.com/one",
        .pattern_start = "data-price=\"",
        .pattern_end = "\"",
    }, std.testing.allocator);
    try product.add_url(.{
        .url = "https://example.com/two",
        .pattern_start = "price: ",
        .pattern_end = ";",
        .currency = "USD",
        .is_minor = true,
    }, std.testing.allocator);

    try expectEqual(@as(usize, 2), product.urls.len);
    try expectEqualStrings("https://example.com/one", product.urls[0].url);
    try expectEqualStrings("https://example.com/two", product.urls[1].url);
    try expectEqualStrings("USD", product.urls[1].currency);
    try expect(product.urls[1].is_minor);
}

test "get_price extracts content between markers" {
    var body = "<span data-price=\"199.99\">".*;
    const url = ProductUrl{
        .url = "https://example.com",
        .pattern_start = "data-price=\"",
        .pattern_end = "\"",
    };

    const price = try get_price(&body, &url);

    try expectEqualStrings("199.99", price);
}

test "get_price rejects missing markers" {
    var missing_start = "<span>199.99</span>".*;
    var missing_end = "<span data-price=\"199.99</span>".*;
    const url = ProductUrl{
        .url = "https://example.com",
        .pattern_start = "data-price=\"",
        .pattern_end = "\"",
    };

    try expectError(error.InvalidPrice, get_price(&missing_start, &url));
    try expectError(error.InvalidPrice, get_price(&missing_end, &url));
}

test "format_price removes currency symbols and commas" {
    var price = "$1,299.99".*;

    const formatted_price = format_price(&price);

    try expectEqualStrings("1299.99", formatted_price);
}
