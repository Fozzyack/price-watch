const std = @import("std");

pub const ProductUrl = struct {
    url: []const u8,
    pattern: []const u8,
};

pub const Product = struct {
    name: []const u8,
    urls: []ProductUrl = &.{},
    pub fn init_product(name: []const u8) Product {
        return .{ .name = name };
    }

    pub fn deinit(self: *Product, allocator: std.mem.Allocator) void {
        allocator.free(self.urls);
    }
};

pub fn add_url(product: *Product, url: []const u8, pattern: []const u8, allocator: std.mem.Allocator) !void {
    const urls_len = product.urls.len;
    if (urls_len == 0) {
        product.urls = try allocator.alloc(ProductUrl, 1);
    } else {
        product.urls = try allocator.realloc(product.urls, urls_len + 1);
    }

    const new_url: ProductUrl = .{
        .url = url,
        .pattern = pattern,
    };

    product.urls[urls_len] = new_url;
}
