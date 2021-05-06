var path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: {
   plugin: "./src/index.ts"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"), //打包文件存放的路径
    libraryTarget: 'commonjs2',
    libraryExport:'default'
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    fallback: { path: false, fs: false }
  },
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader",  }],
  },
};