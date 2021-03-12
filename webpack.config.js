const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: path.resolve(__dirname, 'src', 'html', 'index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'html'),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
  },
};
