module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "plugins": [
    "html"
  ],
  "rules": {
    "linebreak-style": 0,
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "no-console": 1,
    "no-constant-condition": 0
  }
};
