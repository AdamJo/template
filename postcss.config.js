const variables = {
  primary: 'pink',
  secondary: 'blue'
};
const extensions = {
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
  plugins: [
    require('postcss-import'),
    require('postcss-cssnext')({
      browsers: ['last 2 versions'],
      features: {
        customProperties: {
          variables
        },
        customMedia: {
          extensions
        }
      }
    }),
    require('postcss-reporter')
  ]
};
