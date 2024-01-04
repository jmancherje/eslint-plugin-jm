const { RuleTester } = require("eslint");
const requiredTypeArgumentsCode = require("./required-type-arguments");

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    /* ESLint root options - See: https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options */
    ecmaVersion: "latest",
    sourceType: "module",
  },
});

const defaultOptions = [
  [
    ["useForm", 1],
    ["useFormContext", 1],
  ],
];

ruleTester.run("required-type-arguments", requiredTypeArgumentsCode, {
  valid: [
    {
      // Test exact number of type args
      code: `
          useForm<test>();
          useFormContext<arg>();
        `,
      options: defaultOptions,
    },
    {
      // Test exceeding minumum type args
      code: `
          useForm<test, has, more, than, minimum>();
          useFormContext<arg>();
        `,
      options: defaultOptions,
    },
  ],
  invalid: [
    {
      // Test no type arg
      code: `
        useFormContext<hasarg>();
        useFormContext();
      `,
      options: defaultOptions,
      errors: [
        {
          message:
            "useFormContext should have at least 1 explicit type argument(s)",
        },
      ],
    },
    {
      // Test less than minimum type arg
      code: `
        useForm<first, second>()
      `,
      options: [[["useForm", 3]]],
      errors: [
        {
          message: "useForm should have at least 3 explicit type argument(s)",
        },
      ],
    },
  ],
});

console.log("All tests passed!");
