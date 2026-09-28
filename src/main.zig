const std = @import("std");
const extract = @import("extract.zig");
const file_stuff = @import("file_reader.zig");

pub fn main() !void {
    var gpa: std.heap.DebugAllocator(.{}) = .init;
    defer _ = gpa.deinit();

    var arena = std.heap.ArenaAllocator.init(gpa.allocator());
    defer arena.deinit();

    var threaded_io = std.Io.Threaded.init(arena.allocator(), .{});
    const io = threaded_io.io();

    try file_stuff.parse_file(io);
}
