# @wunderflats/validator

[![Travis Build](http://img.shields.io/travis/wunderflats/validator.svg?style=flat)](https://travis-ci.org/wunderflats/validator)

A highly-flexible validator for (nested) objects of user input.

## Features

* Error messages are generated according to a schema and can be easily customized and translated
* Validation rules are composed from functions, so unused validators will not bloat your code
* Validators are simple functions so they can be easily added, customized and composed
* Supports dependencies on other fields, e.g. `passwordConfirmation: equalToField('user.password')`
* Built to run in browsers and node.js, so you can share your validation code
* If the first validator for a property fails, the remaining will be ignored
* Support for asynchronous validators

## Built-in validators

### typeOf(type)

Checks if `typeof value === type`.

### containing(seed)

Checks if a string or array contains specified seed.

### equalTo(seed)

Checks if field is exactly (`===`) equal specified seed.

### beforeDate(seed)

Checks if date or valid date string is before date in specified field.

### afterDate(seed)

Checks if date or valid date string is after date in specified field.

### date()

Checks if field is a valid date string.

### defined()

Checks if a field is not `undefined`. Use this for required fields.

### email()

Checks if string is a valid email.

### monthString(padded = true)

Checks if string is a valid month string ('01' - '12'). If `padded` is set to false, it will not expect single-digit months to be 0-padded.

### yearString()

Checks if string is a valid year string ('YYYY').

### length(length)

Checks if value (string, array, array-like) has specified length.

### countryCode

Checks if value is an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.

### fromField(field, validator)

Constructs a validator that receives value of `field` as its first argument.

This allows you to compare fields from the same input object, e.g.:

```javascript
const rules = {
  password: [defined, minLength(8)],
  passwordConfirmation: [defined, fromField('password', equalTo)]
}
```

## API

### validator(rules[, opts]) -> function validate

#### rules

A hash of field names mapped to one or more validators that are executed sequentially.

Validators are functions but `validator` can call them under the hood for you:

```javascript
const rules = {
  firstName: defined() // this is the 'correct' way
  lastName: defined, // but this also works and is prettier <3
}
```

Pass an array of validators to have them execute sequentially. After the first fail, the remaining will be ignored:

```javascript
const rules = {
  email: [defined, email]
}
```

#### opts

* `opts.async = false` - let the validator run asynchronously. Must be set if any validator returns a promise, otherwise throws an error during validation.
* `opts.throwing = (Custom)Error` - will let the validator throw / reject with an instance of provided error constructor if there are errors (passing them as a parameter to the constructor). Otherwise, resolve with / return input.

## Usage

### Installation

```
npm i @wunderflats/validator
```

### Example: validate creation of a user

```javascript
const validator = require('@wunderflats/validator')
const defined = require('@wunderflats/validator/lib/validators/defined')
const str = require('@wunderflats/validator/lib/validators/string')
const email = require('@wunderflats/validator/lib/validators/email')
const equalTo = require('@wunderflats/validator/lib/validators/equal-to')

const validate = validator({
  firstName: [defined, str], // mustBeDefined && mustBeString
  lastName: [defined, str], // mustBeDefined && mustBeString
  email: [defined, str, email], // ... && mustBeEmail
  password: [defined, str, minLength(8)], // ... && mustBeMinLength:8
  passwordConfirmation: [defined, fromField('password', equalTo)] // ... && mustBeEqualTo:password,
  newsletter: defined
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
//   password: 'mustBeMinLength:8'm
//   newsletter: 'mustBeDefined'
// }

const errors = validate({
  firstName: 'Max',
  lastName: 'Schmitt',
  email: 'wundermax@wunderflats.com',
  password: '12345678',
  passwordConfirmation: '123456',
  newsletter: 'whatever'
})

console.log(errors)

// {
//   passwordConfirmation: 'mustBeEqualTo:12345678$fromField:password'
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
  return { validate }

  function validate (value) {
    const success = typeof value === 'string'
    return {
      success,
      error : success ? false : 'string'
    }
  }
}
```

### Configuration

#### Validator object

Each validator must expose a function that can optionally take parameters for configuration. It must return an object that implements `{ validate: (Function) }`. You may optionally declare a dependency on another field in your input by setting `{ dependsOn: (String) fieldName }`. If the validator regards `undefined` as potentially valid input, specify `{ acceptsUndefined: true }`. You most-likely will not need this.

#### Naming

To enforce non-verbose and consistent error messages, the error message is composed from the validator's `return.error` by prepending `mustBe`. So for the `string` validator above, the resulting error message would be `mustBeString` if validation fails.

Names of validators should be camel-cased and resolve to a readable error message given a prepended `mustBe`.

Examples:

* `string`: `mustBeString` (good)
* `equalToField:[fieldName]`: `mustBeEqualToField:password` (good)
* `minLength:[length]`: `mustBeMinLength:6` (acceptable)
* `required`: `mustBeRequired` (bad)
* `must be a valid email`: `mustBeMust be a valid email` (very bad)

#### validate function

The `validate` function of your validator is called with two parameters `value` and `input`. `value` is the value of the field it should be run against and `input` is the complete input object.

Your validate function must return a validation object with the following interface:

```javascript
{
  success: (bool)
  error: false | (string)
}
```

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
    start: [defined(), date(), fromField('duration.end', beforeDate)], // mustBeDefined && mustBeDate && mustBeBeforeDate:%value%$fromField:duration.end
    end: [defined(), date()] // mustBeDefined && mustBeDate
  }
})
```
