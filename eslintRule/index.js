module.exports = {
  create(context) {
    return {
      BinaryExpression(node) {
        if (node.operator === '===') {
          const leftType = context.getType(node.left);
          const rightType = context.getType(node.right);

          if (leftType && leftType.name === 'ObjectId') {
            context.report({
              node,
              message: 'Use .equals() method to compare ObjectId values instead of === operator',
            });
          } else if (rightType && rightType.name === 'ObjectId') {
            context.report({
              node,
              message: 'Use .equals() method to compare ObjectId values instead of === operator',
            });
          }
        }
      },
    };
  },
};
