const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode : "development",
  entry : ["./src/scripts/index.js"],
  output : {
      path : path.resolve("build"),
      publicPath : "/dist",
      filename : "build.js"
  },
  // plugins : [
  //   new MiniCssExtractPlugin({
  //     path : path.resolve("build"),
  //     publicPath : "/dist",
  //     filename: "style.css"
  //   })
  // ],
  devtool: "inline-source-map",
  watch : true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader"
        ]  
      }
    ]
  },
  devServer: {
    contentBase : "./src/pages",
    port : 9090,
    inline : true
  }
};
