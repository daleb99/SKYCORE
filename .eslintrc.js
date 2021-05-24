module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'off',
  },
};
