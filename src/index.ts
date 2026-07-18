import { Validator, Rule, IpAddressOptionsType, DateOptionsType } from "./types";
import { RegexOptionsFactory, RegexPatterns, ValidationRules, ValidatorFactory } from "./utils";

class Settings {
  /**
   * Merges a list of validators with a new rule and returns the updated list.
   * @param validators - The existing validators.
   * @param rule - The rule to be added.
   * @returns An array of validators including the new rule.
   * @protected
   */
  protected mergeValidators(validators: Validator[], rule: Rule): Validator[] {
    return [...validators, rule.rule ?? ValidatorFactory.createValidator(rule.name, rule.pattern)];
  }

  /**
   * Creates a simplified rule without the precompiled regular expression rule.
   * @param name - The name of the validator.
   * @param pattern - The pattern used by the validator.
   * @returns A simplified rule without the precompiled regular expression rule.
   * @protected
   */
  protected createRule(name: Validator["name"], pattern: string | RegExp, rule?: RegExp): Rule {
    return {
      name,
      pattern,
      ...(rule ? { rule: { name, pattern, rule } } : {}),
    };
  }

  /**
   * Validates a given value against an array of validators.
   * @param value - The value to be validated.
   * @param validators - An array of validators with precompiled rules.
   * @returns True if the value passes all validators, false otherwise.
   * @protected
   */
  protected validate(value: string, validators: readonly Validator[]) {
    return validators.every((validator) => {
      validator.rule.lastIndex = 0;
      return validator.rule.test(value);
    });
  }
}

/**
 * A utility class for creating and combining validation rules using regular expressions.
 */
class Regex extends Settings {
  constructor() {
    super();
  }

  /**
   * Holds an array of validation rules.
   * @type {Rule[]}
   * @private
   */
  private rules: Rule[] = [];

  private addRule(rule: Rule) {
    this.rules.push(rule);
  }

  /**
   * Adds a rule to validate alphanumeric strings.
   * @returns The current instance of the Regex class.
   */
  toBeAlphanumeric() {
    this.addRule(this.createRule("ALPHANUMERIC", RegexPatterns.ALPHANUMERIC));
    return this;
  }

  /**
   * Adds a rule to validate numeric strings.
   * @returns The current instance of the Regex class.
   */
  toBeNumeric() {
    this.addRule(this.createRule("NUMERIC", RegexPatterns.NUMERIC));
    return this;
  }

  /**
   * Adds a rule to validate uppercase strings.
   * @returns The current instance of the Regex class.
   */
  toBeUppercase() {
    this.addRule(this.createRule("UPPERCASE", RegexPatterns.UPPERCASE));
    return this;
  }

  /**
   * Adds a rule to validate lowercase strings.
   * @returns The current instance of the Regex class.
   */
  toBeLowercase() {
    this.addRule(this.createRule("LOWERCASE", RegexPatterns.LOWERCASE));
    return this;
  }

  /**
   * Adds a rule to validate hex color codes.
   * @returns The current instance of the Regex class.
   */
  toBeHexColor() {
    this.addRule(this.createRule("HEX_COLOR", RegexPatterns.HEX_COLOR));
    return this;
  }

  /**
   * Adds a rule to check if a string contains a specific value.
   * @param value - The value to check for.
   * @returns The current instance of the Regex class.
   */
  toContains(value: string) {
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    this.addRule(this.createRule("CONTAINS", escapedValue));
    return this;
  }

  /**
   * Adds a custom rule to match a specific pattern.
   * @param pattern - The custom pattern to match.
   * @returns The current instance of the Regex class.
   */
  toMatch(pattern: string | RegExp) {
    this.addRule(this.createRule("CUSTOM", pattern));
    return this;
  }

  /**
   * Adds a rule to validate email addresses.
   * @param pattern - Custom email pattern (optional).
   * @returns The current instance of the Regex class.
   */
  toBeEmail(pattern: string | RegExp = ValidationRules.EMAIL.pattern) {
    this.addRule(this.createRule("EMAIL", pattern));
    return this;
  }

  /**
   * Adds a rule to validate phone numbers.
   * @param pattern - Custom phone number pattern (optional).
   * @returns The current instance of the Regex class.
   */
  toBePhoneNumber(pattern: string | RegExp = ValidationRules.PHONE_NUMBER.pattern) {
    this.addRule(this.createRule("PHONE_NUMBER", pattern));
    return this;
  }

  /**
   * Adds a rule to validate URLs.
   * @param pattern - Custom URL pattern (optional).
   * @returns The current instance of the Regex class.
   */
  toBeURL(pattern: string | RegExp = ValidationRules.URL.pattern) {
    this.addRule(this.createRule("URL", pattern));
    return this;
  }

  /**
   * Adds a rule to validate credit card numbers.
   * @param pattern - Custom credit card number pattern (optional).
   * @returns The current instance of the Regex class.
   */
  toBeCreditCardNumber(pattern: string | RegExp = ValidationRules.CREDIT_CARD_NUMBER.pattern) {
    this.addRule(this.createRule("CREDIT_CARD_NUMBER", pattern));
    return this;
  }

  /**
   * Adds a rule to validate username strings.
   * @returns The current instance of the Regex class.
   */
  toBeUsername(pattern: string | RegExp = ValidationRules.USERNAME.pattern) {
    this.addRule(this.createRule("USERNAME", pattern));
    return this;
  }

  /**
   * Adds a rule to validate dates.
   * @param options - Options for date validation:
   *                 - string | RegExp: Custom date pattern
   *                 - DateOptionsType: Configuration object with format, strict validation, and range options
   * @type {string | RegExp | DateOptionsType} for options
   * @returns The current instance of the Regex class.
   *
   * @example
   * // Basic date validation with default MM/DD/YYYY pattern
   * iWantRegex().toBeDate().end().test('12/25/2023'); // true
   *
   * @example
   * // ISO 8601 date validation
   * iWantRegex().toBeDate({ withFormat: 'ISO8601' }).end().test('2023-12-25'); // true
   *
   * @example
   * // Strict date validation (validates that the date actually exists)
   * iWantRegex().toBeDate({
   *   withFormat: 'MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY',
   *   strictValidation: true
   * }).end().test('02/31/2023'); // false (February doesn't have 31 days)
   *
   * @example
   * // Date range validation
   * iWantRegex().toBeDate({
   *   withFormat: 'YYYY-MM-DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D',
   *   strictValidation: true,
   *   rangeValidation: {
   *     after: '2023-01-01',
   *     before: '2023-12-31',
   *     inclusive: true
   *   }
   * }).end().test('2023-06-15'); // true (date is within range)
   */
  toBeDate(options?: string | RegExp | DateOptionsType) {
    if (!options) {
      this.addRule(this.createRule("DATE", ValidationRules.DATE.pattern));
      return this;
    }

    if (typeof options === "string" || options instanceof RegExp) {
      this.addRule(this.createRule("DATE", options));
      return this;
    }

    if (options.withFormat) {
      const dateOptions = RegexOptionsFactory.createRegexOptions({
        name: "DATE",
        options,
      });
      this.addRule(this.createRule("DATE", dateOptions.pattern, dateOptions.rule));
      return this;
    }

    return this;
  }

  /**
   * Adds a rule to validate IP addresses.
   * @param options - Options for IP address validation:
   *                 - string | RegExp: Custom IP address pattern
   *                 - IpAddressOptionsType: Configuration object with format, CIDR notation, and IP type options
   * @type {string | RegExp | IpAddressOptionsType}
   * @returns The current instance of the Regex class.
   *
   * @example
   * // Basic IP address validation (matches both IPv4 and IPv6)
   * iWantRegex().toBeIpAddress().end().test('192.168.1.1'); // true
   *
   * @example
   * // IPv4 only validation
   * iWantRegex().toBeIpAddress({ withFormat: 'v4' }).end().test('2001:db8::1'); // false
   *
   * @example
   * // IPv6 with CIDR notation
   * iWantRegex().toBeIpAddress({
   *   withFormat: 'v6',
   *   validateCIDR: true
   * }).end().test('2001:db8::/32'); // true
   *
   * @example
   * // Private IPv4 address validation
   * iWantRegex().toBeIpAddress({
   *   withFormat: 'v4',
   *   validateType: ['private']
   * }).end().test('192.168.1.1'); // true (private IP)
   */
  toBeIpAddress(options?: string | RegExp | IpAddressOptionsType) {
    const name: Validator["name"] = "IP_ADDRESS";

    if (!options) {
      this.addRule(this.createRule(name, ValidationRules.IP_ADDRESS.pattern));
      return this;
    }

    if (typeof options === "string" || options instanceof RegExp) {
      this.addRule(this.createRule(name, options));
      return this;
    }

    if (options.withFormat) {
      const ipAddressOptions = RegexOptionsFactory.createRegexOptions({
        name,
        options,
      });
      this.addRule(this.createRule(name, ipAddressOptions.pattern, ipAddressOptions.rule));
      return this;
    }

    return this;
  }

  /**
   * Adds a rule to validate passwords.
   * Password must have at least
   * One Uppercase, one Lowercase and one Number
   * And must be at least 6 long
   * @param pattern - Custom password pattern (optional).
   * @type {string | RegExp}
   * @returns The current instance of the Regex class.
   */
  toCheckPassword(pattern: string | RegExp = ValidationRules.PASSWORD.pattern) {
    this.addRule(this.createRule("PASSWORD", pattern));
    return this;
  }

  /**
   * Validates a given value against the accumulated rules.
   * @param value - The value to be validated.
   * @returns An object with methods to test the value against the accumulated rules.
   */
  end() {
    const validators = Object.freeze(
      this.rules.reduce<Validator[]>((prev, curr) => this.mergeValidators(prev, curr), []),
    );

    return {
      /**
       * Tests the given value against all accumulated rules.
       * @param value - The value to be tested.
       * @returns True if the value passes all rules, false otherwise.
       */
      test: (value: string) => this.validate(value, validators),

      /**
       * Gets the array of validators.
       * @returns An array of validators with names, patterns, and precompiled rules.
       */
      getValidators: () => [...validators],

      /**
       * Gets the pattern of a specific validator.
       * @param name - The name of the validator.
       * @returns The regex rule used by the specified validator.
       */
      getValidator: (name: Validator["name"]) => validators.find((validator) => validator.name === name)?.rule,
    };
  }
}

/**
 * A factory function for creating a frozen instance of the Regex class.
 * @returns A frozen instance of the Regex class for building and applying regular expression validation rules.
 */
export const iWantRegex = () => Object.freeze(new Regex());
