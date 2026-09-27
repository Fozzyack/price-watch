const std = @import("std");



const ProductParseError = error {
    InvalidProductNameDelimiter,
    EndingDelimiterNotFound,
    ProductNameTooLong,
};


pub fn parse_file(io: std.Io) !void {
    const dir = std.Io.Dir.cwd();
    var file = try dir.openFile(io, "check_pages.config", .{ .mode = .read_only });
    defer file.close(io);

    var read_buffer: [4096]u8 = undefined;
    var offset: usize = 0;
    var consumed: usize = 0;
    while(true) {
        const bytes_read = file.readPositionalAll(io, &read_buffer[consumed..], offset);
        if (bytes_read == 0) { // EOF
            break;
        }
        offset += bytes_read;
    }
}
