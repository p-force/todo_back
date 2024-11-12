module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": 0,
    "import/no-extraneous-dependencies": 0,
    "no-plusplus": 0,
    quotes: 0,
    "comma-dangle": 0,
    "max-len": 0,
    "object-curly-newline": 0,
  },
};
