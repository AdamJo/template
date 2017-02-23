const variables = {
  primary: 'red',
  secondary: 'blue'
};

const media = {
  maxS: '(max-width: 30em)',
  minS: '(min-width: 30.01em)',
  maxM: '(max-width: 50em)',
  minM: '(min-width: 50.01em)',
  maxL: '(max-width: 65em)',
  minL: '(min-width: 65.01em)',
  maxXL: '(max-width: 80em)',
  minXL: '(min-width: 80.01em)'
};

module.exports = {
  plugins: function() {
    return [
      require('postcss-cssnext')({
        browsers: ['last 2 versions'],
        features: {
          customProperties: {
            variables
          },
          customMedia: {
            extensions: {}
          }
        }
      })
    ];
  }
};
