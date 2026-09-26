const std = @import("std");


const Url = struct {
    url: []const u8,
    pattern: []const u8,
};

const Product = struct {
    name: []const u8,
    urls: [] Url = &.{},
    fn deinit(self: *Product, allocator: std.mem.Allocator) void {
        allocator.free(self.urls);
    }
};

pub fn init_product(name: []const u8) Product {
    const product: Product = .{ .name = name, };
    return product;
}

pub fn add_url(product: *Product, url: []const u8, pattern: []const u8, allocator: std.mem.Allocator) !void {
    const urls_len = product.urls.len;
    if (urls_len == 0)  {
        product.urls = try allocator.alloc(Url, 1);
    } else {
        product.urls = try allocator.realloc(product.urls, urls_len + 1);
    }

    const new_url: Url = .{
        .url = url,
        .pattern = pattern,
    };

    product.urls[urls_len] = new_url;

}
