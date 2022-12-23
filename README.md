# BetterMongo

## Title

ESLint Rule for ObjectId Equality

## Description

This project aims to address the unexpected behavior of the ObjectId type in JavaScript/TypeScript when using the === operator. Specifically, two ObjectId objects that are equal according to the equals method will not be considered equal by the === operator, which can lead to false negatives and no warning from TypeScript/ESLint.

To solve this problem, this project provides an ESLint rule that warns when the === operator is used with ObjectId values. The rule searches the abstract syntax tree for instances of the === operator where both the left-hand-side and right-hand-side could be ObjectId, and sends a warning with a suggestion to use the equals method instead. This helps developers avoid using the === operator with ObjectId values, improving the reliability of their code.

## Background

This project uses the following technologies and tools:

MongoDB
JavaScript/TypeScript
ESLint

## Solution

The implementation of the ESLint rule is as follows:

```javascript
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

```
This rule traverses the abstract syntax tree and checks for instances of the === operator where either the left-hand-side or right-hand-side is of type ObjectId. If it finds such an instance, it reports a warning with the specified message.

## Examples

Here's an example of how to use the ESLint rule in a real-world setting:

```javascript

const x = new ObjectId();
const y = new ObjectId(x.toString());

console.log(x.equals(y)); // true
console.log(x === y); // false (warning will be issued)
```

## Installation

To install and use this project, follow these steps:

Install the eslint and @typescript-eslint/parser packages.
Add the following configuration to your .eslintrc file:

```javascript

{
  "parser": "@typescript-eslint/parser",
  "plugins": ["object-id-equality"],
  "rules": {
    "object-id-equality/no-object-id-equality": "warn"
  }
}
```
Run eslint on your code to check for violations of the rule.
