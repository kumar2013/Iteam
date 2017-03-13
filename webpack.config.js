var Webpack                 = require("webpack");
var ExtractTextPlugin       = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: "./index.js",
  output: {
    filename: "dist/bundle.min.js"
  },
  devServer: {
   inline: true,
   port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader'), 
      },
      {
        test: /\.png$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'dist/styles/style.min.css',
      allChunks: true
    }),
    new Webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  }
}

