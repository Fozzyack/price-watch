const std = @import("std");



const ProductParseError = error {
    InvalidProductNameDelimiter,
    EndingDelimiterNotFound,
    ProductNameTooLong,
};


fn find_product_name(buffer: []const u8, output: []u8) ![]const u8{

    if (buffer[0] != '[') return ProductParseError.InvalidProductNameDelimiter;

    for(buffer[1..], 0..) | character, index | {
        if (character == ']')  {
            return output[0..index];
        }
        if (index == output.len) {
            return ProductParseError.ProductNameTooLong;
        }
        output[index] = character;
    }
    return ProductParseError.EndingDelimiterNotFound;
}

pub fn parse_file(io: std.Io) !void {
    const dir = std.Io.Dir.cwd();
    var file = try dir.openFile(io, "check_pages.config", .{ .mode = .read_only });
    defer file.close(io);

    var read_buffer: [4096]u8 = undefined;
    var offset: usize = 0;
    var name_buffer: [256]u8 = undefined;
    while (true) {
        const bytes_read: usize = try file.readPositionalAll(io, &read_buffer, offset);
        if (bytes_read == 0) break;
        offset += bytes_read;
        const product_name = find_product_name(read_buffer[0..bytes_read], &name_buffer) catch | err | {
            if (err == ProductParseError.EndingDelimiterNotFound) continue
            else return err;
        };
        std.debug.print("{s}\n", .{product_name});
    }
}
