const std = @import("std");


const Url = struct {
    url: []const u8 = undefined,
    pattern: []const u8 = undefined,
};

const Product = struct {
    name: []const u8 = undefined,
    urls: [] Url = undefined,
};
