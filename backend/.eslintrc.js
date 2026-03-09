module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  plugins: ["sql"],
  rules: {
    "no-console": "warn",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "import/prefer-default-export": "off",
    "sql/format": ["error", { dialect: "postgres" }],
    "sql/no-unsafe-query": "error",
  },
};
