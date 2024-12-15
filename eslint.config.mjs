import prettier from "eslint-plugin-prettier";
import babel from "@babel/eslint-plugin";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("eslint:recommended"),
  {
    plugins: {
      prettier,
      "@babel": babel,
    },
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
      },
      parser: babelParser,
      ecmaVersion: 2024,
      sourceType: "script",
    },
    rules: {
      "prettier/prettier": "error",
      "comma-dangle": ["error", "always-multiline"],
      quotes: [2, "single"],
      semi: [2, "always"],
      indent: ["error", 4],
      "max-len": ["error", { code: 150 }],
      curly: 0,
      "no-multi-spaces": 2,
      "keyword-spacing": [
        2,
        {
          after: true,
          before: true,
        },
      ],
      "no-trailing-spaces": 2,
      "space-unary-ops": [
        1,
        {
          words: true,
          nonwords: false,
        },
      ],
    },
  },
];
