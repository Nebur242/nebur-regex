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
    return [...validators, ValidatorFactory.createValidator(rule.name, rule.pattern)];
  }

  /**
   * Creates a simplified rule without the precompiled regular expression rule.
   * @param name - The name of the validator.
   * @param pattern - The pattern used by the validator.
   * @returns A simplified rule without the precompiled regular expression rule.
   * @protected
   */
  protected createRule(name: Validator["name"], pattern: string | RegExp): Rule {
    return {
      name,
      pattern,
    };
  }

  /**
   * Validates a given value against an array of validators.
   * @param value - The value to be validated.
   * @param validators - An array of validators with precompiled rules.
   * @returns True if the value passes all validators, false otherwise.
   * @protected
   */
  protected validate(value: string, validators: Validator[]) {
    return validators.every((validator) => validator.rule.test(value));
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
    this.addRule(this.createRule("CONTAINS", value));
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
   * @param options - Custom date pattern or DateFormatOptions object (optional).
   * @type {string | RegExp | DateOptionsType} for options
   * @returns The current instance of the Regex class.
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
      this.addRule(this.createRule("DATE", dateOptions.pattern));
      return this;
    }

    return this;
  }

  /**
   * Adds a rule to validate ipAddresses.
   * @param options - Custom ipAddress pattern or ipAddressOptions object (optional).
   * @type {string | RegExp | IpAddressOptionsType}
   * @returns The current instance of the Regex class.
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
      const passwordOptions = RegexOptionsFactory.createRegexOptions({
        name,
        options,
      });
      this.addRule(this.createRule(name, passwordOptions.pattern));
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
    const validators = this.rules.reduce<Validator[]>((prev, curr) => this.mergeValidators(prev, curr), []);

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
      getValidators: () => validators,

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
