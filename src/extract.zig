const std = @import("std");
const http = @import("html.zig");

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
    const start: usize = std.mem.indexOf(u8, body, url.pattern_start) orelse unreachable;
    const price_start = start + url.pattern_start.len;
    const price_end = std.mem.indexOfPos(u8, body, price_start, url.pattern_end) orelse return error.InvalidPrice;
    const price = body[price_start..price_end];
    return price;
}

pub fn extract(product: *Product, io: std.Io, allocator: std.mem.Allocator) !void {
    for (product.urls) |url| {
        const body = try http.get_page_content(url.url, allocator, io);
        const price = try get_price(body, &url);
        std.debug.print("{s}\n", .{price});
    }
}
