module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    indent: ["error", 2, { "SwitchCase": 1 }]
  },
  ignorePatterns: ['.eslintrc.js', 'dist/**/*.js'],
}
