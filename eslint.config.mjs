import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Cyclomatic complexity: same metric as the VS Code "Code Metrics" extension
  { rules: { complexity: ["warn", 10] } },
  // Nothing deprecated: needs type information to know what is marked @deprecated
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { parserOptions: { projectService: true } },
    rules: { "@typescript-eslint/no-deprecated": "error" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
