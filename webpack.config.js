module.exports = {
  node: {
    fs: "empty",
    global: true,
    crypto: true,
    tls: "empty",
    net: "empty",
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    buffer: true,
  },
  externals: {
    bufferutil: "commonjs bufferutil",
    "utf-8-validate": "commonjs utf-8-validate",
  },
};
