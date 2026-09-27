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
    try product_1.add_url(.{ .url = "http://localhost:5173/product-2", .pattern_start = "data-quote-price=\"", .pattern_end = "\"" }, arena.allocator());
    try product_1.add_url(.{ .url = "http://localhost:5173/product-3", .pattern_start = "data-price=\"", .pattern_end = "\"", .currency = "USD", .is_minor = true }, arena.allocator());
    try product_1.add_url(.{ .url = "http://localhost:5173/product-4", .pattern_start = "data-current-price=\"", .pattern_end = "\"", .currency = "USD" }, arena.allocator());
    defer product_1.deinit(arena.allocator());

    var product_2: extract.Product = extract.Product.init_product("oura ring 4");
    try product_2.add_url(.{
        .url = "https://www.jbhifi.com.au/products/oura-ring-4-size-6-gold",
        .pattern_start = "Value: \"",
        .pattern_end = "\"",
    }, arena.allocator());
    try product_2.add_url(.{ .
        url = "https://www.amazon.com.au/Oura-Ring-Tracking-Wearable-Fitness/dp/B0D9WTSRP8?th=1", 
        .pattern_start = "<span class=\"a-price aok-align-center apex-pricetopay-value\" data-a-size=\"xl\" data-a-color=\"base\"><span class=\"a-offscreen\">", 
        .pattern_end = "</span>" 
    }, arena.allocator());
    try product_2.add_url(.{
        .url = "https://pricehound.com.au/product/oura-ring-4-gold",
        .pattern_start = "\"price\":\"",
        .pattern_end = "\"",
    }, arena.allocator());
    defer product_2.deinit(arena.allocator());

    try extract.extract(&product_1, io, arena.allocator());
    try extract.extract(&product_2, io, arena.allocator());
}
