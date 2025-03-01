/* eslint-disable */
import js from "@eslint/js";
import globals from "globals";
import nodePlugin from "eslint-plugin-n";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintSortKeysFix from "eslint-plugin-sort-keys-fix";
import eslintPerfectionist from "eslint-plugin-perfectionist";

// Core Node Configuration
const coreConfig = [
  js.configs.all,
  nodePlugin.configs["flat/recommended"],
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/coverage",
      "**/logs",
      "**/*.config.*",
      "**/*.json",
      "**/*.setup.*",
      "**/*.d.ts"
    ],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2020,
      globals: {
        ...globals.es2020,
        ...globals.builtin
      }
    },
    plugins: {
      n: nodePlugin
    },
    settings: {
      n: {
        version: ">=21.1.0"
      }
    },
    rules: {
      /* Should be on but after refactoring */
      "no-undefined": ["off"], // (off) Allows the use of `undefined` // "error" disallows `undefined` usage
      "no-undef-init": ["off"], // (off) Allows uninitialized variables // "error" disallows uninitialized variables

      /* Off Rules */

      "one-var": ["off"], // (off) Allows declaring variables with multiple `const`, `let`, or `var` statements // "error" requires combining declarations
      "max-statements": ["off"], // (off) Allows any number of statements in a function // "error" limits statements per function
      "id-length": ["off"], // (off) Allows identifiers of any length // "error" enforces min/max length on identifiers
      "new-cap": ["off"], // (off) Allows lowercase letters for constructor names // "error" requires capitalized constructor names
      "max-lines": ["off"], // (off) Allows files of any length // "warn" limits file length to a maximum
      "max-params": ["off"], // (off) Allows functions with any number of parameters // "error" limits parameter count
      "max-lines-per-function": ["off"], // (off) Allows functions of any length // "warn" limits function length
      complexity: ["off"], // (off) Allows any code complexity level // "error" limits code complexity
      "no-ternary": ["off"], // (off) Allows the use of the ternary operator // "error" disallows ternary operators
      "no-nested-ternary": ["off"], // (off) Allows nested ternary operators // "error" disallows nested ternaries
      "no-underscore-dangle": ["off"], // (off) Allows identifiers with underscores // "warn" disallows underscores in identifiers
      "no-plusplus": ["off"], // (off) Allows the `++` and `--` unary operators // "error" disallows `++` and `--`
      "no-negated-condition": ["off"], // (off) Allows negated conditions // "error" disallows negated conditions
      "no-alert": ["off"], // (off) Allows `alert`, `confirm`, and `prompt` usage // "error" disallows `alert`, `confirm`, `prompt`
      "no-inline-comments": ["off"], // (off) Allows inline comments // "warn" disallows inline comments
      "no-duplicate-imports": ["off"], // (off) Allows duplicate imports // "error" disallows duplicate imports
      "n/no-missing-import": ["off"], // (off) Allows missing imports; conflicts with `import/order` // "error" requires all imports to resolve
      "no-redeclare": ["off"], // (off) Allows redeclaring variables // "error" disallows redeclaring variables
      "no-void": ["off"], // (off) Allows the `void` operator // "error" disallows the `void` operator
      "capitalized-comments": ["off"], // (off) Allows comments in any case // "warn" requires comments to be capitalized
      "no-fallthrough": ["off"], // (off) Allows `switch` cases to fall through // "error" disallows `switch` cases to fall through
      "no-warning-comments": ["off"], // (off) Allows comments with `TODO` // "warn" disallows comments with `TODO`

      /* Warning Rules */

      "default-case": ["warn"], // (off) Allows switch without default cases // "warn" Requires a default case in `switch` statements
      "consistent-return": ["warn"], // (off) Allows mixed return types // "warn" Enforces consistent return values in functions
      "no-await-in-loop": ["warn"], // (off) Allows `await` statements inside loops // "warn" disallows `await` in loops
      "no-else-return": ["warn"], // (off) Allows `else` blocks after `return` statements // "warn" disallows `else` after `return`
      "no-magic-numbers": ["warn"], // (off) Allows "magic" numbers without naming them // "warn" disallows unnamed "magic" numbers
      "no-use-before-define": ["warn"], // (off) Allows usage before definition // "warn" Enforces variables to be defined before use
      "n/no-unsupported-features/node-builtins": ["warn"], // (off) Allows any Node built-in // "warn" Disallows unsupported Node.js built-ins

      /* Error Rules */

      "func-style": ["error", "declaration", { allowArrowFunctions: true }], // (off) Allows function expressions // "error" Enforces function declarations over expressions, allows arrow functions
      "no-console": ["warn"] // (off) Allows console usage // "warn" Enforces removal of `console` statements
    }
  }
];
// Styling (Prettier, Import, and Perfectionist) Configuration
const stylingConfig = [
  eslintPerfectionist.configs["recommended-natural"],
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    ignores: [
      "node_modules",
      "dist",
      "coverage",
      "logs",
      "*.config.*",
      "*.json",
      "*.setup.*",
      "*.d.ts"
    ],
    languageOptions: {},
    plugins: {
      "sort-keys-fix": eslintSortKeysFix
    },
    rules: {
      /* Off Rules */

      "sort-imports": ["off"], // (off) Allows unsorted imports // "warn" Sorts imports in alphabetical order
      "sort-keys": ["off"], // (off) Allows object keys in any order // "warn" Enforces that object keys are sorted
      "perfectionist/sort-modules": ["off"], // (off) Allows modules in any order // "warn" Enforces that module statements are sorted

      /* Warning Rules */

      "prettier/prettier": ["warn"], // (off) Disables Prettier formatting enforcement // "warn" Enforces Prettier formatting rules

      "sort-keys-fix/sort-keys-fix": [
        "warn",
        "asc",
        {
          caseSensitive: false,
          natural: true
        }
      ], // (off) Allows unsorted object keys // "warn" Sorts object keys in ascending order and fixes them

      // Perfectionist Rules - enabled as error by default
      "perfectionist/sort-imports": [
        "warn",
        {
          type: "natural",
          order: "asc",
          ignoreCase: true,
          specialCharacters: "keep",
          //Matcher: "minimatch",
          internalPattern: ["^~/.+"],
          newlinesBetween: "always",
          maxLineLength: undefined,
          sortSideEffects: true,
          groups: [
            ["style", "side-effect-style"],
            [
              "builtin-type",
              "builtin",
              "external-type",
              "external",
              "side-effect"
            ],
            [
              "internal-type",
              "internal",
              "parent-type",
              "parent",
              "sibling-type",
              "sibling",
              "index-type",
              "index"
            ],
            "object",
            "unknown"
          ],
          customGroups: { type: {}, value: {} },
          environment: "node"
        }
      ], // (off) Allows unsorted imports // "warn" Sorts imports in alphabetical order
      "perfectionist/sort-array-includes": ["warn"], // (off) Allows unsorted array includes // "warn" Sorts array includes in alphabetical order
      "perfectionist/sort-jsx-props": ["warn"], // (off) Allows unsorted JSX props // "warn" Sorts JSX props in alphabetical order
      "perfectionist/sort-classes": ["warn"], // (off) Allows unsorted classes // "warn" Sorts classes in alphabetical order
      "perfectionist/sort-enums": ["warn"], // (off) Allows unsorted enums // "warn" Sorts enums in alphabetical order
      "perfectionist/sort-exports": ["warn"], // (off) Allows unsorted exports // "warn" Sorts exports in alphabetical order
      "perfectionist/sort-interfaces": ["warn"], // (off) Allows unsorted interfaces // "warn" Sorts interfaces in alphabetical order
      "perfectionist/sort-intersection-types": ["warn"], // (off) Allows unsorted intersections // "warn" Sorts intersections in alphabetical order
      "perfectionist/sort-maps": ["warn"], // (off) Allows unsorted maps // "warn" Sorts maps in alphabetical order
      "perfectionist/sort-named-exports": ["warn"], // (off) Allows unsorted named exports // "warn" Sorts named exports in alphabetical order
      "perfectionist/sort-named-imports": ["warn"], // (off) Allows unsorted named imports // "warn" Sorts named imports in alphabetical order
      "perfectionist/sort-object-types": ["warn"], // (off) Allows unsorted object types // "warn" Sorts object types in alphabetical order
      "perfectionist/sort-objects": ["warn"], // (off) Allows unsorted objects // "warn" Sorts objects in alphabetical order
      "perfectionist/sort-sets": ["warn"], // (off) Allows unsorted sets // "warn" Sorts sets in alphabetical order
      "perfectionist/sort-switch-case": ["warn"], // (off) Allows unsorted switch cases // "warn" Sorts switch cases in alphabetical order
      "perfectionist/sort-union-types": ["warn"], // (off) Allows unsorted union types // "warn" Sorts union types in alphabetical order
      "perfectionist/sort-variable-declarations": ["warn"] // (off) Allows unsorted variable declarations // "warn" Sorts variable declarations in alphabetical order

      /* Error Rules */
    }
  }
];

export default [...coreConfig, ...stylingConfig];
