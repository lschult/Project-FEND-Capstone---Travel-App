const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/client/app.js",
  output: {
    libraryTarget: "var",
    library: "Client",
    publicPath: "/",
  },
  mode: "development",
  // https://webpack.js.org/configuration/dev-server/#devserverproxy
  devServer: {
    proxy: {
      "/geonames-places": "http://localhost:8081",
      "/future-weather": "http://localhost:8081",
      "/pixabay-photos": "http://localhost:8081",
      "/save-trip": "http://localhost:8081",
      "/trips-history": "http://localhost:8081",
      "/delete-trip": "http://localhost:8081",
      "/add-search-favorite": "http://localhost:8081",
      "/result-of-search": "http://localhost:8081",
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new WriteFilePlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/client/icons", to: "icons" },
        { from: "src/client/images", to: "images" },
      ],
    }),
    new Dotenv(),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: false,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
  ],
};
