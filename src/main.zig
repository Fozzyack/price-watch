const std = @import("std");
const extract = @import("extract.zig");

pub fn main() !void {
    var gpa: std.heap.DebugAllocator(.{}) = .init;
    defer _ = gpa.deinit();

    var arena = std.heap.ArenaAllocator.init(gpa.allocator());
    defer arena.deinit();

    var threaded_io = std.Io.Threaded.init(arena.allocator(), .{});
    const io = threaded_io.io();

    var product_1: extract.Product = extract.Product.init_product("Voltage 9 Neural Deck");
    try product_1.add_url("http://localhost:5173/product-1", "data-price=\"", "\"", arena.allocator());
    try product_1.add_url("http://localhost:5173/product-2", "data-price=\"", "\"", arena.allocator());
    try product_1.add_url("http://localhost:5173/product-3", "data-price=\"", "\"", arena.allocator());
    try product_1.add_url("http://localhost:5173/product-4", "data-price=\"", "\"", arena.allocator());
    try extract.extract(&product_1, io, arena.allocator());
}
