const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const utils = require('../scripts/loadersTests');
const {resolveApp} = require('../scripts/paths');
const commonConfig = require('./webpack.config.common');

const ENV = process.env.ENV;
process.env.NODE_ENV = 'production';

module.exports = webpackMerge.merge(commonConfig, {
  mode: 'production',
  bail: true,
  stats: 'errors-only',

  output: {
    path: resolveApp('docs'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
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
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  performance: {
    hints: false,
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Elements UI',
      filename: 'index.html',
      template: resolveApp('site/index.html'),
      favicon: resolveApp('site/favicon.ico'),
      hash: true,
      chunksSortMode: 'none',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new CopyPlugin({
      patterns: [
        {
          from: resolveApp('site/_redirects'),
          to: resolveApp('docs/'),
        },
      ],
    }),

    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV),
      },
    }),
  ],
});
