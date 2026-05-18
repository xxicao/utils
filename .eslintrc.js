module.exports = {
  'env': {
      'browser': true,
      'es6': true,
      'node': true
  },
  'extends': 'eslint:recommended',
  'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly',
      'ENV': true
  },

  'parserOptions': {
      'ecmaVersion': 2020,
      'sourceType': 'module'
  },
  'rules': {
      'linebreak-style': [
        'error',
        'unix'
      ],
      'quotes': [
        'error',
        'single'
      ]
  },
  'overrides': [
    {
      'files': ['test/**/*.test.js'],
      'globals': {
        'describe': 'readonly',
        'it': 'readonly',
        'expect': 'readonly',
        'vi': 'readonly',
        'beforeEach': 'readonly',
        'afterEach': 'readonly',
        'beforeAll': 'readonly',
        'afterAll': 'readonly'
      }
    }
  ]
};