module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  plugins: ["sql"],
  rules: {
    "no-console": "warn",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "import/prefer-default-export": "off",
    quotes: ["error", "double"],
    "sql/format": ["error", { dialect: "postgres" }],
    "sql/no-unsafe-query": "error",
  },
};
