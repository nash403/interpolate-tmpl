var webpack = require('webpack');

module.exports = {
  entry: "./index",
  output: {
    path: __dirname,
    filename: "./browser-version/interpolate.js",
    library: "interpolate",
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ["",".js"]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/], // exclude unwanted js files
      loader: 'babel' // 'babel-loader' is also valid name
    }]
  }
}
