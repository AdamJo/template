const path = require('path');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require(
  'webpack-bundle-analyzer'
).BundleAnalyzerPlugin;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => {
  const isProd = env && env.production;
  return {
    entry: {
      src: './src',
      vendor: ['preact', 'preact-router', 'preact-css-transition-group']
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[hash].js',
      publicPath: '/'
    },

    module: {
      rules: [
        {
          test: /\.jsx?/i,
          loader: 'babel-loader',
          include: [path.resolve(__dirname, 'src')],
          options: {
            presets: ['es2015', 'stage-0', 'react'],
            plugins: [
              [
                'transform-react-jsx',
                {
                  pragma: 'h'
                }
              ]
            ]
          }
        },
        {
          test: /(\.scss|\.css)/,
          include: [path.resolve(__dirname, 'src')],
          use: (
            isProd
              ? ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[hash:base64:5]'
                      }
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        plugins: function() {
                          return require('postcss-cssnext')({
                            browsers: ['last 2 versions']
                          });
                        }
                      }
                    }
                  ]
                })
              : [
                  {
                    loader: 'style-loader'
                  },
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      importLoaders: 1,
                      localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      plugins: function() {
                        return require('postcss-cssnext')({
                          browsers: ['last 2 versions']
                        });
                      }
                    }
                  }
                ]
          )
        },
        {
          test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
          loader: (
            isProd
              ? 'file-loader?name=[path][name]_[hash:base64:5].[ext]'
              : 'url-loader'
          )
        }
      ]
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.css', '.scss'],
      alias: {
        components: path.resolve(__dirname, 'src/views/components'),
        containers: path.resolve(__dirname, 'src/views/containers'),
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }
    },
    plugins: (
      isProd
        ? [
            new CleanWebpackPlugin('dist'),
            new HtmlWebpackPlugin({
              template: 'src/index.html'
            }),
            new webpack.optimize.CommonsChunkPlugin({
              name: 'vendor'
            }),
            new webpack.optimize.UglifyJsPlugin({
              output: {
                comments: 0
              },
              compress: {
                unused: 1,
                warnings: 0,
                comparisons: 1,
                conditionals: 1,
                negate_iife: 0, // <- for `LazyParseWebpackPlugin()`
                dead_code: 1,
                if_return: 1,
                join_vars: 1,
                evaluate: 1
              }
            }),
            new BundleAnalyzerPlugin(),
            new ExtractTextPlugin('styles.css')
          ]
        : [
            new HtmlWebpackPlugin({
              template: 'src/index.html'
            }),
            new webpack.optimize.CommonsChunkPlugin({
              name: 'vendor'
            }),
            new ExtractTextPlugin('styles.css')
          ]
    ),
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      compress: true,
      historyApiFallback: true
    }
  };
};
