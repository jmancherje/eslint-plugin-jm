// enforce-foo-bar.test.js
const { RuleTester } = require("eslint");
const fooBarRule = require("./required-type-arguments");

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    /* ESLint root options - See: https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options */
    ecmaVersion: "latest",
    sourceType: "module",
  },
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  "enforce-foo-bar", // rule name
  fooBarRule, // rule code
  {
    valid: [
      `
        function useForm<T>() {}
        useForm<string>()
      `,
    ],
    invalid: [
      {
        code: `
          function useForm<T>() {}
          useForm()
        `,
        errors: [
          {
            message: "useForm should have at least 1 explicit type argument(s)",
          },
        ],
      },
    ],
  }
);

console.log("All tests passed!");
