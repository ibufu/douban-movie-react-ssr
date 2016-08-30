var fs = require('fs')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {

  devtool: 'inline-source-map',
  debug: true,

  entry: path.resolve(__dirname, 'server/index.js'),

  output: {
    filename: 'server.bundle.js',
    path: path.join(__dirname, 'server/dist'),
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),
  
  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'ignore-loader' }
    ]
  },

  plugins: [
      new webpack.DefinePlugin({
            'process.env': {
                ENV: JSON.stringify('production'),
                NODE_ENV: JSON.stringify('production')
            },
            '__NODE__': JSON.stringify(true)
        }),
  ],

}