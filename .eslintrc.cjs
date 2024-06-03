module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        paths: ["src"],
      },
      typescript: {},
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "eslint-config-prettier",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "eslint-plugin-storybook",
    "react",
    "@typescript-eslint",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "import/no-unresolved": [2, { caseSensitive: false }],
    "import/named": 0,
  },
};
