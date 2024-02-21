<p align="center">A package that simplifies developer experience working with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions" target="_blank">Regular expressions</a>.</p>
    <p align="center">
<a href="#" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://www.paypal.com/donate/?hosted_button_id=DENZZAD4EPNYY" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
  <a href="https://twitter.com/nebur242" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

# Nebur-Regex 🚀

**Simplify Developer Experience with Regular Expressions**

Nebur-Regex is a powerful utility package designed to streamline the developer experience with regular expressions. With an intuitive and expressive API, it provides a convenient way to create, combine, and apply regular expression validation rules in your JavaScript or TypeScript projects.

## Key Features:

- 🧩 Predefined rules for common use cases such as alphanumeric, email, numeric, phone number, URL, and more.
- 🛠️ Easy-to-use methods for adding custom rules and patterns.
- ❄️ Immutable instances to ensure rule sets are maintained consistently.
- 🚀 Clear and concise syntax for building complex validation logic effortlessly.
- ❄️ Frozen instances for enhanced predictability and reliability.

Simplify your regular expression handling and validation tasks with nebur-regex, making it easier and more enjoyable to work with regex in your applications.


## Installation

```bash
$ npm install nebur-regex
```

## Example CommonJs

```typescript
const { iWantRegex } = require('nebur-regex');

const constraints = 
  iWantRegex()
  .toContains('@')
  .toBeEmail()
  .end();

const isValid = constraints.test("test@test.com");

console.log(isValid); //true
```

## Example ES6 module

```typescript
import { iWantRegex } from 'nebur-regex';

const constraints = 
  iWantRegex()
  .toBeAlphanumeric()
  .end();

const isValid = constraints.test("hello00nebur_");

console.log(isValid); //false
```

## More examples

```typescript
import { iWantRegex } from 'nebur-regex';

// Creating a set of regex constraints using 'iWantRegex', chaining various rules.
const constraints = 
  iWantRegex() // Initializing the regex constraint builder
  .toBeAlphanumeric() // Enforcing alphanumeric characters only
  .toBeCreditCardNumber() // Ensuring a valid credit card number format
  .toBeDate() // Checking if the input is a valid date => Format: MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY
  .toBeEmail() // Validating the input as an email address
  .toBeHexColor() // Confirming the input is a valid hex color code
  .toBeLowercase() // Verifying that all characters are in lowercase
  .toBeNumeric() // Ensuring the input consists of numeric characters only
  .toBePhoneNumber() // Validating the input as a phone number
  .toBeURL() // Checking if the input is a valid URL
  .toBeUppercase() // Verifying that all characters are in uppercase
  .toContains('hi') // Checking if the input contains the substring 'hi'
  .toMatch(/^([0-9]+)$/) // Ensuring the input matches the specified regex pattern (only digits)
  .end(); // Always End the chaining of regex constraints

// Testing the constraints against the string "hello world"
const isValid = constraints.test("hello world"); // false;

// Logging the result of the validation
console.log('isValid', isValid);
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Support

[nebur-regex](https://github.com/Nebur242/nebur-regex) is an MIT-licensed open source project. Anyone can contribute. Don't hesitate to fork, make PRs or proposals to improve and make it better.


## Stay in touch

- Author - [Ruben Merson Nzaou](https://nebur242.com)
- Twitter - [@nebur242](https://twitter.com/nebur242)


## Contribution

[Nebur Regex](https://github.com/Nebur242/nebur-regex) Package TypeScript starter repository.


## License

MIT License

Copyright (c) 2024, Ruben Merson Nzaou / nebur242, <rm.nzaou.etudes@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.