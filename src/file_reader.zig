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
}
