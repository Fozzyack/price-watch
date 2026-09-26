const std = @import("std");
const html = @import("html.zig");

pub fn main() !void {
    std.debug.print("Hello, {s}!\n", .{"World"});
    var gpa: std.heap.DebugAllocator(.{}) = .init;
    defer _ = gpa.deinit();

    var arena = std.heap.ArenaAllocator.init(gpa.allocator());
    defer arena.deinit();

    var threaded_io = std.Io.Threaded.init(arena.allocator(), .{});
    const io = threaded_io.io();
    std.debug.print("{any}\n", .{@TypeOf(io)});

    const body = try html.get_page_content("frasier.dev", arena.allocator(), io);

    std.debug.print("{any}\n", .{body});
}
