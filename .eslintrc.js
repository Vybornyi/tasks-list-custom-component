module.exports = {
  extends: 'eslint-config-airbnb-base',
  rules: {
    'no-console': 2,
    'import/prefer-default-export': 0,
    'no-use-before-define': 0,
    'no-shadow': 0,
  },
  env: {
    browser: true,
    jest: true,
  },
};
