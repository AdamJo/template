const path = require('path');
const webpack = require('webpack');

const plugins = require('./plugins');
const Module = require('./module');

const ROOT = path.resolve(__dirname, '..');
const root = path.join.bind(path, ROOT);

module.exports = env => {
  const isProd = env && env.production;
  const config = {
    entry: {
      src: root('./src'),
      vendor: ['preact', 'preact-router', 'preact-css-transition-group']
    },
    output: {
      path: root('./dist'),
      filename: '[name].[hash].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.css', '.scss'],
      alias: {
        components: root('./src/views/components'),
        containers: root('./src/views/containers'),
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }
    },
    module: Module(isProd, root),
    plugins: plugins(isProd, root),
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      compress: true,
      historyApiFallback: true
    }
  };
  return config;
};
