'use strict'

module.exports = (plop) => {
  plop.setGenerator('validator', {
    description: 'validator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'name of the validator?',
        validate: (value) => ((/.+/).test(value) || 'name is required')
      }
    ],
    actions: (data) => {
      return [
        {
          type: 'add',
          path: 'lib/validators/{{dashCase name}}.js',
          templateFile: 'plop-templates/validators/validator.js'
        },
        {
          type: 'add',
          path: 'lib/validators/{{dashCase name}}.test.js',
          templateFile: 'plop-templates/validators/validator.test.js'
        }
      ]
    }
  })
}
