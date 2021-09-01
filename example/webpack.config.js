/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    // hierarchy: `${__dirname}/hierarchy.ts`,
    app: `${__dirname}/index.tsx`,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    compress: true,
    port: 3001,
    https: false,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
  watch: true,
};
