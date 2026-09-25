const std = @import("std");
const html = @import("html.zig");

pub fn main() !void {
    std.debug.print("Hello, {s}!\n", .{"World"});
    var gpa: std.heap.DebugAllocator(.{}) = .init;
    var threaded_io = std.Io.Threaded.init(gpa.allocator(), .{});
    const io = threaded_io.io();
    std.debug.print("{any}\n", .{@TypeOf(io)});

    html.get_page_content("google.com", gpa.allocator(), io);
}
