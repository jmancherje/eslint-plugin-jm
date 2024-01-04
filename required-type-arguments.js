module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Require certain functions pass in specific number of type arguments",
    },
    fixable: "code",
    schema: [
      {
        type: "array",
        minItems: 0,
        items: [
          {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: [
              {
                type: "string",
              },
              {
                type: "number",
                minimum: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  create(context) {
    const args = context.options;
    const typeArgumentMap = args[0].reduce((acc, [fn, argCount]) => {
      return {
        ...acc,
        [fn]: argCount,
      };
    }, {});

    return {
      CallExpression(node) {
        for (let fnName in typeArgumentMap) {
          if (node.callee.name !== fnName) continue;
          if (
            !node.typeParameters ||
            node.typeParameters.params.length < typeArgumentMap[fnName]
          ) {
            context.report(
              node,
              `${fnName} should have at least ${typeArgumentMap[fnName]} explicit type argument(s)`
            );
            break;
          }
        }
      },
    };
  },
};
