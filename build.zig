const std = @import("std");

pub fn build(b: *std.Build) void {
    const exe = b.addExecutable(.{
        .name = "zystem",
        .root_module = b.createModule(.{
            .root_source_file = b.path("./src/main.zig"),
            .target = b.graph.host,
        }),
        .use_llvm = true,
    });

    b.installArtifact(exe);
}
