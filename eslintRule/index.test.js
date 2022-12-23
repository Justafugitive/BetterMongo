const rule = require('./index');
const RuleTester = require('eslint').RuleTester;

const tester = new RuleTester({
    parserOptions: {
      ecmaVersion: 2021,
    },
    settings: {},
  });
  
  tester.run('my-rule', rule, {
    valid: [
      {
        code: `const x = new ObjectId();
               const y = new ObjectId(x.toString());
               console.log(x.equals(y));`,
      },
    ],
    invalid: [
      {
        code: `const x = new ObjectId();
               const y = new ObjectId(x.toString());
               console.log(x === y);`,
        errors: [
          {
            message: 'Use .equals() method to compare ObjectId values instead of === operator',
          },
        ],
      },
    ],
  });
  