const std = @import("std");

pub fn get_page_content(page: []const u8, allocator: std.mem.Allocator, io: std.Io) ![]u8 {
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

    if (@intFromEnum(response.head.status) > 300 or @intFromEnum(response.head.status) < 200) {
        return error.StatusNotOk;
    }

    var transfer_buffer: [8192]u8 = undefined;
    var decompress_buffer: [std.compress.flate.max_window_len]u8 = undefined;
    var decompressor: std.http.Decompress = undefined;
    var reader = response.readerDecompressing(
        &transfer_buffer,
        &decompressor,
        &decompress_buffer,
    );

    const body = try reader.allocRemaining(allocator, std.Io.Limit.limited(10 * 1024 * 1024));

    return body;
}
