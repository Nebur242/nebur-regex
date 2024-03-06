<p align="center">A package that simplifies developer experience working with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions" target="_blank">Regular expressions</a>.</p>
    <p align="center">
<a href="#" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://www.paypal.com/donate/?hosted_button_id=DENZZAD4EPNYY" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
  <a href="https://twitter.com/nebur242" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

# Nebur-Regex 🚀

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


## Quick exqmple

```typescript
import { iWantRegex } from 'nebur-regex'; // ES6 module
//OR
const { iWantRegex } = require('nebur-regex'); // CommonJs

const constraints = 
  iWantRegex()
  .toContains('@')
  .toBeEmail()
  .end();

const isValid = constraints.test("test@test.com");

console.log(isValid); //true
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
const isValid = constraints.test("hello world"); 

// Logging the result of the validation
console.log('isValid', isValid); // false;
```

## Stay in touch

- Author - [Ruben Merson Nzaou](https://nebur242.com)
- Twitter - [@nebur242](https://twitter.com/nebur242)


## License

Click here 👉 [More details](https://github.com/Nebur242/nebur-regex/blob/main/licence)