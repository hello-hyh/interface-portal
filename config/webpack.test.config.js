var path = require("path");
var webapck = require('webpack')
// var TerserPlugin = require('terser-webpack-plugin');
var InterfacePortal = require('../src/index')
module.exports = {
  entry: {
    test: "./test/index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"), //打包文件存放的路径
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  node: {
    fs: 'empty',
    path: 'empty'
  },
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader" }],
  },
  // enter your openapi json path.
  plugins: [new InterfacePortal({ apiPath: '1' })],
  mode: "production",
};