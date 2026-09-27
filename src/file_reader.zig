const std = @import("std");



const ProductParseError = error {
    InvalidProductNameDelimiter,
    EndingDelimiterNotFound,
    ProductNameTooLong,
};

fn get_product_name(buffer: []u8, output_buffer: []u8) ![]const u8{
    if (buffer[0] != '[') return ProductParseError.InvalidProductNameDelimiter;
    for(buffer[1..], 0..) | character, index | {
        if (index == output_buffer.len) return ProductParseError.ProductNameTooLong;
        if (character == ']') return output_buffer[0..index];
        output_buffer[index] = character;
    }
    return ProductParseError.EndingDelimiterNotFound;
}


pub fn parse_file(io: std.Io) !void {
    const dir = std.Io.Dir.cwd();
    var file = try dir.openFile(io, "check_pages.config", .{ .mode = .read_only });
    defer file.close(io);

    var read_buffer: [1028]u8 = undefined;

    var name_buffer: [256]u8 = undefined;

    var offset: usize = 0;
    var used: usize = 0;

    while(true) {
        const bytes_read = file.readPositionalAll(io, &read_buffer[0..used], offset);
        if (bytes_read == 0) { // EOF
            break;
        }

        if(read_buffer != undefined) {
            if(read_buffer[0] == '[') {
                const product_name: []u8 = get_product_name(&read_buffer, &name_buffer) catch | err | {
                    if ( err == ProductParseError.EndingDelimiterNotFound ) continue
                    else return err;
                };
                const consumed: usize = product_name.len;
                const remaining = used - consumed;
                std.mem.copyForwards(u8, read_buffer[0..remaining], read_buffer[consumed..used]);
                used = remaining;
            }
        }
        offset += bytes_read;
    }
}
