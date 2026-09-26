const std = @import("std");
const extract = @import("extract.zig");

pub fn main() !void {
    var gpa: std.heap.DebugAllocator(.{}) = .init;
    defer _ = gpa.deinit();

    var arena = std.heap.ArenaAllocator.init(gpa.allocator());
    defer arena.deinit();

    var threaded_io = std.Io.Threaded.init(arena.allocator(), .{});
    const io = threaded_io.io();

    var product_1: extract.Product = extract.Product.init_product("Some Products");
    try product_1.add_url(.{ .url = "http://localhost:5173/product-1", .pattern_start = "data-price=\"", .pattern_end = "\"" }, arena.allocator());
    try extract.extract(&product_1, io, arena.allocator());
}
