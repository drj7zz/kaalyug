import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  // Base recommended rules.
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Vite project layout — ignore build output and tooling files.
  globalIgnores([
    "dist/**",
    "node_modules/**",
    "vite-out.log",
    "vite-env.d.ts",
    "*.tsbuildinfo",
  ]),
  // Project-specific rules.
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "react/react-in-jsx-scope": "off",
    },
  },
]);

export default eslintConfig;
