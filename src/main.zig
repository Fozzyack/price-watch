const std = @import("std");

const another_file = @import("another_file.zig");

pub fn main(init: std.process.Init) !void {

    try std.Io.File.stdout().writeStreamingAll(init.io, "Hello, World!\n");
    
    another_file.what();

}
