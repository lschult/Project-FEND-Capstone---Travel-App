const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development",
  devtool: "source-map",
  output: {
    libraryTarget: "var",
    library: "Client",
    publicPath: "/",
  },
  devServer: {
    proxy: {
      "/geonames-places": "http://localhost:8081",
      "/future-weather": "http://localhost:8081",
      "/pixabay-photos": "http://localhost:8081",
      "/favorite-trip": "http://localhost:8081",
      "/see-trips-history": "http://localhost:8081",
      "/delete-trip": "http://localhost:8081",
      "/add-search-favorite": "http://localhost:8081",
      "/result-of-search": "http://localhost:8081",
    },
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
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
    new Dotenv(),
    ew CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
  ],
};
