const std = @import("std");

pub fn parse_file(io: std.Io) !void {
    const dir = std.Io.Dir.cwd();
    var file = try dir.openFile(io, "check_pages.config", .{ .mode = .read_only });

    var read_buffer: [4096]u8 = undefined;
    var offset: usize = 0;
    while (true) {
        const bytes_read: usize = try file.readPositionalAll(io, &read_buffer, offset);
        if (bytes_read == 0) break;
        offset += bytes_read;
        std.debug.print("{s}", .{read_buffer[0..bytes_read]});
    }
}
