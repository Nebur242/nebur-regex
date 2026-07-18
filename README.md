<div align="center">

# nebur-regex

Build reusable string validators with a small, fluent, TypeScript-friendly API.

[![npm version](https://img.shields.io/npm/v/nebur-regex.svg)](https://www.npmjs.com/package/nebur-regex)
[![CI](https://github.com/Nebur242/nebur-regex/actions/workflows/build-lint-test.yaml/badge.svg)](https://github.com/Nebur242/nebur-regex/actions/workflows/build-lint-test.yaml)
[![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/Nebur242/nebur-regex)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Nebur242/nebur-regex/blob/main/licence)

[Installation](#installation) · [Quick start](#quick-start) · [API](#api-reference) · [Examples](#examples) · [Limitations](#validation-scope-and-limitations)

</div>

## What is nebur-regex?

`nebur-regex` is a dependency-free validation builder for JavaScript and TypeScript. It provides common validation rules, custom regular-expression support, date and IP address options, and a fluent API for combining multiple requirements.

Every rule in a chain must pass:

```ts
import { iWantRegex } from "nebur-regex";

const accountId = iWantRegex()
  .toBeAlphanumeric()
  .toContains("ACCT")
  .toMatch(/^ACCT\d+$/)
  .end();

accountId.test("ACCT123"); // true
accountId.test("USER123"); // false
```

### Highlights

- Fluent, chainable validation API
- TypeScript declarations included
- Common validators for email, URL, phone number, username, password, dates, IP addresses, and more
- IPv4, IPv6, CIDR, and address-type filtering
- Multiple date formats, strict calendar validation, and date ranges
- Literal substring matching and custom regular expressions
- Validator inspection through `getValidators()` and `getValidator()`
- Stable repeated testing, including custom global or sticky regular expressions
- Node.js 18 or newer
- 100% enforced statement, branch, function, and line coverage

## Installation

### npm

```bash
npm install nebur-regex
```

```bash
yarn add nebur-regex
```

```bash
pnpm add nebur-regex
```

### GitHub Packages

The package is also published as `@nebur242/nebur-regex` on GitHub Packages.

Create or update `.npmrc`:

```ini
@nebur242:registry=https://npm.pkg.github.com
```

Authenticate to GitHub Packages, then install:

```bash
npm install @nebur242/nebur-regex
```

GitHub Packages requires an authentication token with `read:packages`, including for public packages.

## Quick start

### ES modules and TypeScript

```ts
import { iWantRegex } from "nebur-regex";

const email = iWantRegex().toBeEmail().end();

email.test("hello@example.com"); // true
email.test("not-an-email"); // false
```

### CommonJS

```js
const { iWantRegex } = require("nebur-regex");

const username = iWantRegex().toBeUsername().end();

console.log(username.test("ruben_242")); // true
```

### Combining rules

Rules are combined with logical **AND**, not OR:

```ts
const productCode = iWantRegex()
  .toBeUppercase()
  .toMatch(/^SKU-[A-Z0-9]+$/)
  .toContains("SKU-")
  .end();

productCode.test("SKU-A42"); // true
productCode.test("sku-a42"); // false
productCode.test("ITEM-A42"); // false
```

Call `.end()` after adding rules. It returns the finalized validator interface.

## API reference

### `iWantRegex()`

Creates a new validation builder.

```ts
const builder = iWantRegex();
```

Each builder method adds a rule and returns the same builder so calls can be chained.

### Finalized validator

Calling `.end()` returns:

```ts
type FinalizedValidator = {
  test(value: string): boolean;
  getValidators(): Validator[];
  getValidator(name: PatternName): RegExp | undefined;
};
```

#### `test(value)`

Returns `true` only when the value passes every rule.

```ts
const numeric = iWantRegex().toBeNumeric().end();

numeric.test("12345"); // true
numeric.test("12a45"); // false
```

#### `getValidators()`

Returns descriptions of every finalized validator:

```ts
const result = iWantRegex().toBeNumeric().toMatch(/^\d{4}$/).end();

const validators = result.getValidators();

// [
//   { name: "NUMERIC", pattern: ..., rule: ... },
//   { name: "CUSTOM", pattern: ..., rule: ... }
// ]
```

The returned array is a copy. Changing its length or order does not change the finalized validator.

#### `getValidator(name)`

Returns the first compiled `RegExp` for a validator name, or `undefined` when no matching rule exists:

```ts
const result = iWantRegex().toBeEmail().end();
const emailRule = result.getValidator("EMAIL");
```

Available names are:

```text
ALPHANUMERIC
CONTAINS
EMAIL
CUSTOM
DATE
NUMERIC
PHONE_NUMBER
URL
UPPERCASE
LOWERCASE
HEX_COLOR
CREDIT_CARD_NUMBER
USERNAME
IP_ADDRESS
PASSWORD
```

## Validator methods

| Method | Default behavior | Custom pattern |
| --- | --- | --- |
| `toBeAlphanumeric()` | ASCII letters and digits only | No |
| `toBeNumeric()` | Digits `0-9` only | No |
| `toBeUppercase()` | Uppercase letters, digits, and supported punctuation | No |
| `toBeLowercase()` | Lowercase letters, digits, and supported punctuation | No |
| `toBeHexColor()` | Three- or six-digit hex colors with `#` | No |
| `toContains(value)` | Contains a literal substring | No |
| `toMatch(pattern)` | Matches a custom string or `RegExp` | Required |
| `toBeEmail(pattern?)` | Common email address format | Yes |
| `toBePhoneNumber(pattern?)` | Common local and international formats | Yes |
| `toBeURL(pattern?)` | HTTP(S), hostname, path, query, and IPv4 URL forms | Yes |
| `toBeCreditCardNumber(pattern?)` | 13–16 digits with optional spaces, dots, or hyphens | Yes |
| `toBeUsername(pattern?)` | 3–16 ASCII letters, digits, `_`, or `-` | Yes |
| `toBeDate(options?)` | `MM/DD/YYYY` and related slash/dash forms | Yes |
| `toBeIpAddress(options?)` | IPv4 or IPv6 | Yes |
| `toCheckPassword(pattern?)` | At least six characters with lowercase, uppercase, and a digit | Yes |

### Alphanumeric

```ts
const validator = iWantRegex().toBeAlphanumeric().end();

validator.test("Abc123"); // true
validator.test("Abc-123"); // false
validator.test(""); // false
```

### Numeric

```ts
const validator = iWantRegex().toBeNumeric().end();

validator.test("2026"); // true
validator.test("-20"); // false
validator.test("20.5"); // false
```

### Uppercase and lowercase

```ts
const uppercase = iWantRegex().toBeUppercase().end();
const lowercase = iWantRegex().toBeLowercase().end();

uppercase.test("HELLO-2026"); // true
uppercase.test("Hello"); // false

lowercase.test("hello-2026"); // true
lowercase.test("Hello"); // false
```

Case validators allow digits and a defined set of punctuation. They do not merely check whether at least one letter has a particular case.

### Hex colors

```ts
const color = iWantRegex().toBeHexColor().end();

color.test("#fff"); // true
color.test("#1A2b3C"); // true
color.test("1A2B3C"); // false
```

### Literal containment

`toContains()` treats its argument as text, not regex source:

```ts
const dot = iWantRegex().toContains(".").end();

dot.test("example.com"); // true
dot.test("examplecom"); // false
```

### Custom patterns

```ts
const orderId = iWantRegex().toMatch(/^ORD-\d{6}$/).end();

orderId.test("ORD-123456"); // true
orderId.test("123456"); // false
```

Strings are compiled as regular-expression source:

```ts
const startsWithHello = iWantRegex().toMatch("^hello").end();
```

Global and sticky regular expressions are reset before each validation, so repeated tests are stable:

```ts
const repeated = iWantRegex().toMatch(/hello/g).end();

repeated.test("hello"); // true
repeated.test("hello"); // true
```

### Email

```ts
const email = iWantRegex().toBeEmail().end();

email.test("alice+news@example.com"); // true
email.test("alice@example"); // false
```

Override the default:

```ts
const companyEmail = iWantRegex()
  .toBeEmail(/^[a-z0-9._%+-]+@example\.com$/)
  .end();
```

### Phone numbers

```ts
const phone = iWantRegex().toBePhoneNumber().end();

phone.test("+1-(800)-123-4567"); // true
phone.test("+33629312213"); // true
phone.test("CALL-ME"); // false
```

Phone validation checks supported formatting, not whether the number is assigned or reachable.

### URLs

```ts
const url = iWantRegex().toBeURL().end();

url.test("https://example.com/docs?page=2"); // true
url.test("http://127.0.0.1/api"); // true
url.test("ftp://example.com"); // false
```

Use a custom pattern if your application supports other protocols, Unicode domains, or a stricter URL policy.

### Credit-card number format

```ts
const card = iWantRegex().toBeCreditCardNumber().end();

card.test("4916 8046 1708 9891"); // true
card.test("4916-8046-1708-9891"); // true
```

This validator checks formatting and digit count. It does **not** perform a Luhn checksum, identify a card issuer, or confirm that a card exists.

### Usernames

```ts
const username = iWantRegex().toBeUsername().end();

username.test("Ruben_242"); // true
username.test("ab"); // false
username.test("user@example"); // false
```

The default length is 3–16 characters.

### Passwords

```ts
const password = iWantRegex().toCheckPassword().end();

password.test("Abcd12"); // true
password.test("abcdef"); // false
password.test("ABC123"); // false
```

The default requires:

- At least six characters
- At least one uppercase ASCII letter
- At least one lowercase ASCII letter
- At least one digit

A special character is not required by the default. For a custom security policy, provide your own pattern:

```ts
const strongPassword = iWantRegex()
  .toCheckPassword(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/)
  .end();
```

## Date validation

### Default format

Without options, `toBeDate()` accepts month/day/year using `/` or `-`, with optional leading zeroes:

```ts
const date = iWantRegex().toBeDate().end();

date.test("12/31/2026"); // true
date.test("1-5-2026"); // true
```

The default validator checks the shape and basic month/day ranges. Enable `strictValidation` to reject impossible calendar dates.

### Supported formats

`withFormat` is required when passing a date options object:

```ts
type DateFormat =
  | "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY"
  | "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY"
  | "YYYY/MM/DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D"
  | "ISO8601";
```

Examples:

```ts
const dayFirst = iWantRegex()
  .toBeDate({
    withFormat: "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY",
  })
  .end();

dayFirst.test("31/12/2026"); // true

const yearFirst = iWantRegex()
  .toBeDate({
    withFormat: "YYYY/MM/DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D",
  })
  .end();

yearFirst.test("2026-12-31"); // true
```

### ISO 8601

```ts
const isoDate = iWantRegex()
  .toBeDate({
    withFormat: "ISO8601",
  })
  .end();

isoDate.test("2026-07-18"); // true
isoDate.test("2026-07-18T14:30:00Z"); // true
isoDate.test("2026-07-18T14:30:00-04:00"); // true
```

### Strict calendar validation

```ts
const strictDate = iWantRegex()
  .toBeDate({
    withFormat: "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY",
    strictValidation: true,
  })
  .end();

strictDate.test("02/29/2024"); // true
strictDate.test("02/29/2023"); // false
strictDate.test("04/31/2026"); // false
```

Strict mode includes leap-year validation.

### Date ranges

```ts
const dateIn2026 = iWantRegex()
  .toBeDate({
    withFormat: "ISO8601",
    strictValidation: true,
    rangeValidation: {
      after: "2026-01-01",
      before: "2026-12-31",
      inclusive: true,
    },
  })
  .end();

dateIn2026.test("2026-01-01"); // true
dateIn2026.test("2026-07-18"); // true
dateIn2026.test("2027-01-01"); // false
```

Range options:

| Property | Type | Meaning |
| --- | --- | --- |
| `after` | `string \| Date` | Lower boundary |
| `before` | `string \| Date` | Upper boundary |
| `inclusive` | `boolean` | Include both boundaries; defaults to `false` |

String boundaries must use the selected `withFormat`. A single `inclusive` setting applies to both boundaries.

### Custom date pattern

Passing a string or `RegExp` bypasses the built-in date options:

```ts
const yearOnly = iWantRegex().toBeDate(/^\d{4}$/).end();

yearOnly.test("2026"); // true
```

## IP address validation

### Default IPv4 and IPv6

```ts
const ip = iWantRegex().toBeIpAddress().end();

ip.test("192.168.1.10"); // true
ip.test("2001:db8::1"); // true
ip.test("999.168.1.10"); // false
```

### Select an address family

```ts
const ipv4 = iWantRegex().toBeIpAddress({ withFormat: "v4" }).end();
const ipv6 = iWantRegex().toBeIpAddress({ withFormat: "v6" }).end();
const either = iWantRegex().toBeIpAddress({ withFormat: "both" }).end();
```

`withFormat` accepts `"v4"`, `"v6"`, or `"both"`.

### CIDR notation

```ts
const network = iWantRegex()
  .toBeIpAddress({
    withFormat: "both",
    validateCIDR: true,
  })
  .end();

network.test("192.168.0.0/24"); // true
network.test("2001:db8::/32"); // true
network.test("192.168.0.0/33"); // false
network.test("2001:db8::/129"); // false
```

When `validateCIDR` is enabled, the suffix is optional; both an address and an address with a valid prefix are accepted.

### Address types

```ts
type IpAddressType =
  | "private"
  | "public"
  | "loopback"
  | "linkLocal"
  | "multicast"
  | "any";
```

Examples:

```ts
const privateIp = iWantRegex()
  .toBeIpAddress({
    withFormat: "v4",
    validateType: ["private"],
  })
  .end();

privateIp.test("10.0.0.1"); // true
privateIp.test("8.8.8.8"); // false

const localOrLoopback = iWantRegex()
  .toBeIpAddress({
    withFormat: "both",
    validateType: ["private", "loopback"],
  })
  .end();

localOrLoopback.test("192.168.1.1"); // true
localOrLoopback.test("::1"); // true
```

Multiple non-public types use OR semantics: an address may match any selected type. `"any"` disables type filtering.

### Custom IP pattern

```ts
const localAlias = iWantRegex().toBeIpAddress(/^local-\d+$/).end();

localAlias.test("local-42"); // true
```

## Customizing predefined validators

These validators accept a custom string or `RegExp`:

- `toBeEmail(pattern)`
- `toBePhoneNumber(pattern)`
- `toBeURL(pattern)`
- `toBeCreditCardNumber(pattern)`
- `toBeUsername(pattern)`
- `toBeDate(pattern)`
- `toBeIpAddress(pattern)`
- `toCheckPassword(pattern)`

Example:

```ts
const internalUsername = iWantRegex()
  .toBeUsername(/^employee_[0-9]{4}$/)
  .end();

internalUsername.test("employee_0042"); // true
```

When a custom pattern is provided, it replaces that validator's default pattern.

## Practical examples

### Registration form

```ts
const validators = {
  username: iWantRegex().toBeUsername().end(),
  email: iWantRegex().toBeEmail().end(),
  password: iWantRegex().toCheckPassword().end(),
};

const input = {
  username: "ruben_242",
  email: "ruben@example.com",
  password: "Secure42",
};

const isValid =
  validators.username.test(input.username) &&
  validators.email.test(input.email) &&
  validators.password.test(input.password);
```

### API request validation

```ts
const requestIp = iWantRegex()
  .toBeIpAddress({
    withFormat: "both",
    validateType: ["public"],
  })
  .end();

if (!requestIp.test(payload.ip)) {
  throw new Error("A public IPv4 or IPv6 address is required");
}
```

### Reusing a validator

```ts
const hexColor = iWantRegex().toBeHexColor().end();

const colors = ["#fff", "#112233", "blue"];
const validColors = colors.filter((value) => hexColor.test(value));

// ["#fff", "#112233"]
```

## TypeScript types

The package includes declaration files. Types are inferred from the public API without installing a separate `@types` package.

The primary option shapes are:

```ts
type DateOptionsType = {
  withFormat: DateFormat;
  strictValidation?: boolean;
  rangeValidation?: {
    before?: Date | string;
    after?: Date | string;
    inclusive?: boolean;
  };
};

type IpAddressOptionsType = {
  withFormat: "v4" | "v6" | "both";
  validateCIDR?: boolean;
  validateType?: Array<
    "private" | "public" | "loopback" | "linkLocal" | "multicast" | "any"
  >;
};
```

## Validation scope and limitations

Regular expressions validate text structure; they cannot prove that external data is genuine.

- Email validation does not confirm mailbox ownership or deliverability.
- Phone validation does not confirm that a number exists.
- URL validation does not make a network request or guarantee that a resource exists.
- Credit-card validation does not perform the Luhn algorithm or authorize a payment.
- IP type filtering covers the ranges implemented by the package and is not a replacement for a full network-security policy.
- Password validation checks composition, not whether a password has appeared in a breach.
- Default validators primarily target ASCII input.

For security-sensitive systems, combine format validation with domain-specific parsing, normalization, authorization, and server-side checks.

## Behavioral notes

- All chained rules must pass.
- `.end()` snapshots the rules added up to that point.
- `getValidators()` returns a new array, but its validator objects and `RegExp` values should be treated as read-only.
- If no rules are added, `.end().test(value)` returns `true` because there are no failing constraints.
- `toContains()` escapes regex metacharacters and performs literal substring matching.
- String arguments passed to `toMatch()` or custom-pattern overloads are treated as regex source.
- Validation accepts strings; normalize or convert other input types before calling `.test()`.

## Development

Requirements:

- Node.js 18+
- npm

```bash
git clone https://github.com/Nebur242/nebur-regex.git
cd nebur-regex
npm ci
```

Available checks:

```bash
npm test
npm run test:cov
npm run lint
npm run format:check
npm run build
```

The coverage command enforces 100% for statements, branches, functions, and lines.

## Contributing

Issues and pull requests are welcome.

1. Fork the repository.
2. Create a focused branch.
3. Add or update tests for behavioral changes.
4. Run lint, formatting, coverage, and build checks.
5. Open a pull request describing the change and its motivation.

Please avoid weakening validation behavior without documenting the compatibility impact.

## Releases

Releases use semantic versioning:

- **Patch**: backward-compatible fixes
- **Minor**: backward-compatible features
- **Major**: breaking API or behavior changes

The manual release workflow validates the package, publishes to npm and GitHub Packages, and creates a GitHub release.

## Support

- [GitHub issues](https://github.com/Nebur242/nebur-regex/issues)
- [npm package](https://www.npmjs.com/package/nebur-regex)
- [Author website](https://nebur242.com)
- [Donate with PayPal](https://www.paypal.com/donate/?hosted_button_id=DENZZAD4EPNYY)

## License

[MIT](https://github.com/Nebur242/nebur-regex/blob/main/licence) © Ruben Merson Nzaou
