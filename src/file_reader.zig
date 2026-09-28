const std = @import("std");



const ProductParseError = error {
    InvalidProductNameDelimiter,
    EndingDelimiterNotFound,
    ProductNameTooLong,
    NewLineBeforeEndingDelimiter,
};

fn get_product_name(buffer: []u8, output_buffer: []u8) ![]const u8{
    if (buffer[0] != '[') return ProductParseError.InvalidProductNameDelimiter;
    for(buffer[1..], 0..) | character, index | {
        if (index == output_buffer.len) return ProductParseError.ProductNameTooLong;
        if (character == '\n') {
            if (buffer[index] != ']') {
                return ProductParseError.NewLineBeforeEndingDelimiter;
            }
            return output_buffer[0..index - 1];
        }
        output_buffer[index] = character;
    }
    return ProductParseError.EndingDelimiterNotFound;
}

fn strip_buffer(buffer: []u8, consumed: usize, used: *usize) void {
    const remaining = used.* - consumed;
    std.mem.copyForwards(u8, buffer[0..remaining], buffer[consumed..used.*]);
    used.* = remaining;
}

fn strip_empty_lines(buffer: []u8, used: *usize) void {
    var index: usize = 0;
    for(buffer) | character | {
        if (character != '\n') break;
        index += 1;
    }

    if (index > 0) strip_buffer(buffer, index, used);
}


pub fn parse_file(io: std.Io) !void {
    const dir = std.Io.Dir.cwd();
    var file = try dir.openFile(io, "pages.config", .{ .mode = .read_only });
    defer file.close(io);

    var read_buffer: [1024]u8 = undefined;
    var name_buffer: [256]u8 = undefined;

    var offset: usize = 0;
    var used: usize = 0;

    while(true) {
        const bytes_read = try file.readPositionalAll(io, read_buffer[used..], offset);
        if (bytes_read == 0) { // EOF
            break;
        }
        offset += bytes_read;
        used += bytes_read;

        strip_empty_lines(&read_buffer, &used);

        if(read_buffer[0] == '[') {
            const product_name: []const u8 = get_product_name(&read_buffer, &name_buffer) catch | err | {
                if ( err == ProductParseError.EndingDelimiterNotFound ) continue
                else return err;
            };
            std.debug.print("{s}\n", .{product_name});
            strip_buffer(&read_buffer, product_name.len + 3, &used);
        }
    }
}
