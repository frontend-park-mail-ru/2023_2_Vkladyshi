module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier', 'jsdoc'],
  extends: [
    'google',
    'prettier',
    'plugin:jsdoc/recommended',
    'eslint-config-ts-standard',
  ],
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
  parserOptions: {},
  rules: {
    'require-jsdoc': 'warn',
    'valid-jsdoc': 'warn',
    '@typescript-eslint/camelcase': 'off',
    'camelcase': 'off',
    semi: ['error', 'always'],
  },
};
