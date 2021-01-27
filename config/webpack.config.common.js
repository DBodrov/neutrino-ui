const {resolveApp} = require('../scripts/paths');

module.exports = {
  entry: {
    site: resolveApp('site/index.tsx'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'neutrino-ui/lib/sealed': resolveApp('src/sealed/'),
      'neutrino-ui': resolveApp('src/'),
      'neutrino-ui/Themes': resolveApp('src/Themes'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'media/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpg$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          name: '[name].[hash:8].[ext]',
        },
      },
    ],
  },
};
