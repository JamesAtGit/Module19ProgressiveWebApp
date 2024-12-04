const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: './client/src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
    }),
    new WebpackPwaManifest({
      name: 'Text Editor',
      short_name: 'TextEditor',
      description: 'A text editor that works offline',
      background_color: '#ffffff',
      theme_color: '#000000',
      start_url: '/',
      display: 'standalone',
      icons: [
        {
          src: path.resolve('client/src/assets/icons/icon-512x512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      'webpack-dev-server': path.resolve(__dirname, 'node_modules', 'webpack-dev-server'),
    },
  },
};
