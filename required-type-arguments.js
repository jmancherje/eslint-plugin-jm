const explicitTypeArgumentMap = {
  useForm: 1,
};

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Require certain functions pass in specific number of type arguments",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        for (let fnName in explicitTypeArgumentMap) {
          if (node.callee.name !== fnName) continue;
          if (
            !node.typeParameters ||
            node.typeParameters.params.length < explicitTypeArgumentMap[fnName]
          ) {
            context.report(
              node,
              `${fnName} should have at least ${explicitTypeArgumentMap[fnName]} explicit type argument(s)`
            );
            break;
          }
        }
      },
    };
  },
};
