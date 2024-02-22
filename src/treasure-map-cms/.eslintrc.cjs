module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'globals': {
    shallow: true,
    render: true,
    mount: true,
  },
  'rules': {
    'quotes': [
      'error',
      'single',
    ],

    'new-cap': 0,

    // maximum depth that blocks can be nested
    // https://eslint.org/docs/rules/max-depth
    'max-depth': [
      'error',
      3,
    ],

    // maximum depth that callbacks can be nested
    // https://eslint.org/docs/rules/max-nested-callbacks
    'max-nested-callbacks': [
      'error',
      2,
    ],

    // maximum line length
    // https://eslint.org/docs/rules/max-len
    'max-len': [
      1,
      140,
      2, {
        ignoreComments: true,
      },
    ],

    // maximum file length
    // https://eslint.org/docs/rules/max-lines
    'max-lines': [
      'error',
      {
        max: 1500,
        skipBlankLines: true,
        skipComments: true,
      },
    ],

    // maximum function length
    // https://eslint.org/docs/rules/max-lines-per-function
    'max-lines-per-function': [
      'error',
      {
        max: 110,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true,
      },
    ],

    // maximum number of statements allowed in function blocks
    // https://eslint.org/docs/rules/max-statements
    'max-statements': [
      'error',
      30,
    ],

    // maximum number of parameters in function definitions
    // https://eslint.org/docs/rules/max-params
    'max-params': [
      'error',
      3,
    ],

    'linebreak-style': [
      'error',
      'unix',
    ],

    'indent': [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],

    'comma-dangle': [
      2,
      {
        arrays: 'always',
        objects: 'always',
        imports: 'always',
        exports: 'always',
        functions: 'never',
      },
    ],

    'no-console': 'error',
  },
};
