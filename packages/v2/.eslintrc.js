module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest/globals": true
  },
  "extends": [
    "eslint:recommended",
    "airbnb-base"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
  },
  "plugins": ["jest"]
}
