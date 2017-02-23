module.exports = {
  presets: [['es2015', { loose: true, modules: false }], 'stage-0', 'react'],
  plugins: [
    [
      'transform-react-jsx',
      {
        pragma: 'h'
      }
    ]
  ]
};
