<p align="center">A package that can simplify developer experience working with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions" target="_blank">Regular expressions</a>.</p>
    <p align="center">
<a href="#" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://www.paypal.com/donate/?hosted_button_id=DENZZAD4EPNYY" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
  <a href="https://twitter.com/nebur242" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

[Nebur Regex](https://github.com/Nebur242/regex-made-simple) Package TypeScript starter repository.


## Installation

```bash
$ npm install nebur-regex
```

## Example CommonJs

```typescript
const NBR =  require('nebur-regex').default;

const constraints = 
NBR
.iWantRegex()
.toContains('@')
.toBeEmail()
.end()

const isValid = constraints.test("test@test.com");

console.log(isValid); //true
```

## Example ES6 module

```typescript
import NBR from 'nebur-regex';

const constraints = 
NBR
.iWantRegex()
.toBeAlphanumeric()
.end()

const isValid = constraints.test("hello00nebur_");

console.log(isValid); //false
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Support

Regex an MIT-licensed open source project.

## Stay in touch

- Author - [Ruben Merson Nzaou](https://nebur242.com)
- Twitter - [@nebur242](https://twitter.com/nebur242)

## License

Regex is MIT licensed.
