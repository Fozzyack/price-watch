const std = @import("std");
const extract = @import("extract.zig");
const file_stuff = @import("file_reader.zig");

pub fn main(init: std.process.Init) !void {
    var allocator = init.arena.allocator();
    const products: [] extract.Product = try file_stuff.parse_file(init.io, allocator);
    defer allocator.free(products);
    for(products) | *product | {
        try extract.extract(product, init.io, allocator);
    }
}
