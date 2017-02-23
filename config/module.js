const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (isProd, root) => {
  const rules = [
    {
      test: /\.jsx?/i,
      loader: 'babel-loader',
      include: [root('./src')]
    },
    {
      test: /(\.scss|\.css)/,
      include: [root('./src')],
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              minimize: isProd ? true : false,
              localIdentName: (
                isProd ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]'
              )
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      })
    },
    {
      test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
      loader: (
        isProd
          ? 'file-loader?name=[path][name]_[hash:base64:5].[ext]'
          : 'url-loader'
      )
    }
  ];
  return { rules };
};
