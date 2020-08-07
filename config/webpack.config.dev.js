const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackMerge = require('webpack-merge');
const utils = require('../scripts/loadersTests');
const {resolveApp} = require('../scripts/paths');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  bail: true,
  target: 'web',

  output: {
    path: resolveApp('docs'),
    pathinfo: true,
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: utils.tsxRegex,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
    noEmitOnErrors: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolveApp('site/index.html'),
      favicon: resolveApp('site/favicon.ico'),
      inject: true,
      hash: true,
      chunksSortMode: 'none',
    }),
    new ReactRefreshWebpackPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 5000,
    hot: true,
    stats: 'minimal',
    contentBase: resolveApp('site'),
  },
});
