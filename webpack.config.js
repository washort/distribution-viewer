import path from 'path';
import webpack from 'webpack';
import dotenvPlugin from 'webpack-dotenv-plugin';

module.exports = {
  entry: './distributionviewer/core/static/js/app/app.js',
  output: {
    filename: './distributionviewer/core/static/js/bundle.js',
    sourceMapFilename: './distributionviewer/core/static/js/bundle.map'
  },
  devtool: '#source-map',
  plugins: [
    new dotenvPlugin({
      path: '.env'
    })
  ],
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
};
