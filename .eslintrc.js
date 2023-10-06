module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier', 'jsdoc'],
  extends: ['google', 'prettier', 'plugin:jsdoc/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs, css, mjs, html}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'require-jsdoc': 'warn',
    'valid-jsdoc': 'warn',
    // Другие правила JSDoc...
  },
};
