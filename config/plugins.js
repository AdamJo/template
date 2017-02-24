const { join } = require('path');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require(
  'webpack-bundle-analyzer'
).BundleAnalyzerPlugin;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const Dashboard = require('webpack-dashboard/plugin');

const babel = require('./babel');
const uglify = require('./uglify');

module.exports = (isProd, root) => {
  const plugins = [
    new CleanWebpackPlugin(['dist'], { root: join(__dirname, '..') }),
    new HtmlWebpackPlugin({
      template: root('./src/index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProd
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        isProd ? 'production' : 'development'
      )
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        babel
      }
    })
  ];

  if (isProd) {
    babel.presets.push('babili');
    plugins.push(
      new Copy([{ context: 'src/static/', from: '**/*.*' }]),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
      new webpack.optimize.UglifyJsPlugin(uglify)
      // new BundleAnalyzerPlugin()
    );
  } else {
    plugins.push(
      new webpack.NamedModulesPlugin()
      // new Dashboard()
    );
  }
  return plugins;
};
