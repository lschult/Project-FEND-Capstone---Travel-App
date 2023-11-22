const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    libraryTarget: "var",
    library: "Client",
    publicPath: "/",
  },
  mode: "development",
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
    new Dotenv(),
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
  ],
};
