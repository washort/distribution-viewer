import path from 'path';
import webpack from 'webpack';
import CoreJsPlugin from 'core-js-webpack-plugin';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'TRACKING_ID': JSON.stringify(process.env.TRACKING_ID),
    }
  }),

  // Polyfills
  new CoreJsPlugin({
    modules: ['es6.array.from', 'es6.object.assign'],
  }),
];

// Debugging is a bit tricker when the bundle is compressed, so only compress it
// on production.
if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compress: {
      warnings: false
    }
  }));
}

module.exports = {
  entry: './viewer/core/static/js/app/app.js',
  output: {
    filename: './viewer/core/static/js/bundle.js',
    sourceMapFilename: './viewer/core/static/js/bundle.map'
  },
  devtool: '#source-map',
  plugins,
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
};
