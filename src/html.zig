const std = @import("std");

pub fn get_page_content(page: []const u8, allocator: std.mem.Allocator, io: std.Io) !void {
    var client: std.http.Client = .{
        .allocator = allocator,
        .io = io,
    };
    defer client.deinit();

    var req = try client.request(.GET, .{
        .scheme = "https",
        .host = .{ .percent_encoded = page },
        .path = .{ .percent_encoded = "/" },
    }, .{});
    defer req.deinit();

    try req.sendBodiless();

    var header_buffer: [4096]u8 = undefined;
    var response = try req.receiveHead(&header_buffer);

    std.debug.print("status: {}\n", .{response.head.status});

    var transfer_buffer: [8192]u8 = undefined;
    var reader = response.reader(&transfer_buffer);

    const body = try reader.allocRemaining(allocator, std.Io.Limit.limited(10 * 1024 * 1024));
    defer allocator.free(body);

    std.debug.print("{s}\n", .{body});
}
