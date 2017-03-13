module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "ecmaFeatures": {
      "jsx": true,
      "classes": true,
      "modules": true
    }
  },
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "quotes": [2, "single"],
    "eol-last": [0],
    "no-mixed-requires": [0],
    "no-underscore-dangle": [0],
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2
  },
  "plugins": [
    "react"
  ],
  "extends": ["eslint:recommended", "plugin:react/recommended"]
}