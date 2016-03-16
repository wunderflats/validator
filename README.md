# @wunderflats/validator

[![Travis Build](http://img.shields.io/travis/wunderflats/validator.svg?style=flat)](https://travis-ci.org/wunderflats/validator)

A highly-flexible validator for (nested) objects of user input.

## Features

* Error messages are generated according to a schema and can be easily customized and translated
* Validation rules are composed from functions, so unused validators will not bloat your code
* Validators are simple functions so they can be easily added, customized and composed
* Supports dependencies on other fields, e.g. `passwordConfirmation: equalTo('user.password')`
* Built to run in browsers and node.js, so you can share your validation code
* If the first validator for a property fails, the remaining will be ignored
* Support for asynchronous validators

## Installation

```
npm i @wunderflats/validator
```

## Usage

### Example: validate creation of a user

```javascript
const validator = require('@wunderflats/validator')
const defined = require('@wunderflats/validator/lib/validators/defined')
const str = require('@wunderflats/validator/lib/validators/string')
const email = require('@wunderflats/validator/lib/validators/email')
const equalTo = require('@wunderflats/validator/lib/validators/equal-to')

const validate = validator({
  firstName: [defined(), str()], // mustBeDefined && mustBeString
  lastName: [defined(), str()], // mustBeDefined && mustBeString
  email: [defined(), str(), email()], // ... && mustBeEmail
  password: [defined(), str(), minLength(8)], // ... && mustBeMinLength:8
  passwordConfirmation: [defined(), equalTo('password')] // ... && mustBeEqualTo:password
})

const errors = validate({
  email: 'hello',
  password: '123456',
  passwordConfirmation: '123456'
})

console.log(errors)

// {
//   firstName: 'mustBeDefined',
//   lastName: 'mustBeDefined',
//   email: 'mustBeEmail',
//   password: 'mustBeMinLength:8'
// }

const errors = validate({
  firstName: 'Max',
  lastName: 'Schmitt',
  email: 'wundermax@wunderflats.com',
  password: '12345678',
  passwordConfirmation: '123456'
})

console.log(errors)

// {
//   passwordConfirmation: 'mustBeEqualTo:password'
// }
```

### Example: asynchronous validation

For convenience, validation is synchronous by default. You may want to add your own custom validators that ensure, for example, that a username is unique in the database.

Doing so is easy: simply let the `validate` function of your custom validator return a promise and let `validator` know that it should run asynchronously:

```javascript
const validate = validator({
  username: [str(), uniqueIn('users')]
})

const input = {
  username: 'alreadyexists'
}

validate(input).then(console.log)

// {
//   username: 'mustBeUniqueIn:users'
// }
```

`@wunderflats/validator` realizes that `passwordConfirmation` depends on `password`, so it will only validate that field once `password` is valid. Most of the time it doesn't make sense to compare to an invalid value.

If all validation passes, `errors` will be `null`.

## Writing your own validators

### Example: `string`

```javascript
module.exports = () => {
  return {
    name: 'string',
    validate
  }

  function validate (value) {
    return typeof value === 'string'
  }
}
```

### Configuration

#### Validator object

Each validator must expose a function that can optionally take parameters for configuration. It must return an object that implements `{ name: (String), validation: (Function) }`. You may optionally declare a dependency on another field in your input by setting `{ dependsOn: (String) fieldName }`. If the validator regards `undefined` as potentially valid input, specify `{ acceptsUndefined: true }`. You most-likely will not need this.

#### Naming

To enforce non-verbose and consistent error messages, the error message is composed from the validator's `name` by prepending `mustBe`. So for the `string` validator above, the resulting error message would be `mustBeString` if validation fails.

Names of validators should be camel-cased and resolve to a readable error message given a prepended `mustBe`.

Examples:

* `string`: `mustBeString` (good)
* `equalTo:[fieldName]`: `mustBeEqualTo:password` (good)
* `minLength:[length]`: `mustBeMinLength:6` (acceptable)
* `required`: `mustBeRequired` (bad)
* `must be a valid email`: `mustBeMust be a valid email` (very bad)

#### validate function

The `validate` function of your validator is called with two parameters `value` and `input`. `value` is the value of the field it should be run against and `input` is the complete input object.

For convenience, `input` is flattened so that you could easily declare a dependency on another nested field. E.g.:

```javascript
{
  duration: {
    start: '2016-01-01',
    end: '2016-02-01'
  }
}
```

is internally converted to:

```javascript
{
  'duration.start' '2016-01-01',
  'duration.end': '2016-02-01'
}
```

This way you could easily write the following validator:

```javascript
const validateDuration = validator({
  duration: {
    start: [defined(), date(), beforeDate('duration.end')], // mustBeDefined && mustBeDate
    end: [defined(), date()] // mustBeDefined && mustBeDate && mustBeBeforeDate:duration.end
  }
})
```
