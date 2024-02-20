import { Validator, Rule } from "./types";
import { RegexPatterns, ValidationRules, ValidatorFactory } from "./utils";

/**
 * A utility class for creating and combining validation rules using regular expressions.
 */
class Regex {
  /**
   * Holds an array of validation rules.
   * @type {Rule[]}
   * @private
   */
  private rules: Rule[] = [];

  /**
   * Merges a list of validators with a new rule and returns the updated list.
   * @param validators - The existing validators.
   * @param rule - The rule to be added.
   * @returns An array of validators including the new rule.
   * @private
   */
  private mergeValidators(validators: Validator[], rule: Rule): Validator[] {
    return [...validators, ValidatorFactory.createValidator(rule.name, rule.pattern)];
  }

  /**
   * Creates a simplified rule without the precompiled regular expression rule.
   * @param name - The name of the validator.
   * @param pattern - The pattern used by the validator.
   * @returns A simplified rule without the precompiled regular expression rule.
   * @private
   */
  private createRule(name: Validator["name"], pattern: string | RegExp): Rule {
    return {
      name,
      pattern,
    };
  }

  /**
   * Adds a rule to validate alphanumeric strings.
   * @returns The current instance of the Regex class.
   */
  toBeAlphanumeric() {
    this.rules.push(this.createRule("ALPHANUMERIC", RegexPatterns.ALPHANUMERIC));
    return this;
  }

  /**
   * Adds a rule to validate email addresses.
   * @param pattern - Custom email pattern (optional).
   * @returns The current instance of the Regex class.
   */
  toBeEmail(pattern: string | RegExp = ValidationRules.EMAIL.pattern) {
    this.rules.push(this.createRule("EMAIL", pattern));
    return this;
  }

  /**
   * Adds a rule to check if a string contains a specific value.
   * @param value - The value to check for.
   * @returns The current instance of the Regex class.
   */
  toContains(value: string) {
    this.rules.push(this.createRule("CONTAINS", value));
    return this;
  }

  /**
   * Adds a custom rule to match a specific pattern.
   * @param pattern - The custom pattern to match.
   * @returns The current instance of the Regex class.
   */
  toMatch(pattern: string | RegExp) {
    this.rules.push(this.createRule("CUSTOM", pattern));
    return this;
  }

  /**
   * Adds a rule to validate numeric strings.
   * @returns The current instance of the Regex class.
   */
  toBeNumeric() {
    this.rules.push(this.createRule("NUMERIC", RegexPatterns.NUMERIC));
    return this;
  }

  /**
   * Adds a rule to validate phone numbers.
   * @param pattern - Custom phone number pattern (optional).
   * @returns The current instance of the Regex class.
   */
  toBePhoneNumber(pattern: string | RegExp = ValidationRules.PHONE_NUMBER.pattern) {
    this.rules.push(this.createRule("PHONE_NUMBER", pattern));
    return this;
  }

  /**
   * Adds a rule to validate dates.
   * @param pattern - Custom date pattern (optional).
   * @returns The current instance of the Regex class.
   */
  toBeDate(pattern: string | RegExp = ValidationRules.DATE.pattern) {
    this.rules.push(this.createRule("DATE", pattern));
    return this;
  }

  /**
   * Adds a rule to validate URLs.
   * @param pattern - Custom URL pattern (optional).
   * @returns The current instance of the Regex class.
   */
  toBeURL(pattern: string | RegExp = ValidationRules.URL.pattern) {
    this.rules.push(this.createRule("URL", pattern));
    return this;
  }

  /**
   * Adds a rule to validate uppercase strings.
   * @returns The current instance of the Regex class.
   */
  toBeUppercase() {
    this.rules.push(this.createRule("UPPERCASE", RegexPatterns.UPPERCASE));
    return this;
  }

  /**
   * Adds a rule to validate lowercase strings.
   * @returns The current instance of the Regex class.
   */
  toBeLowercase() {
    this.rules.push(this.createRule("LOWERCASE", RegexPatterns.LOWERCASE));
    return this;
  }

  /**
   * Adds a rule to validate hex color codes.
   * @returns The current instance of the Regex class.
   */
  toBeHexColor() {
    this.rules.push(this.createRule("HEX_COLOR", RegexPatterns.HEX_COLOR));
    return this;
  }

  /**
   * Adds a rule to validate credit card numbers.
   * @param pattern - Custom credit card number pattern (optional).
   * @returns The current instance of the Regex class.
   */
  toBeCreditCardNumber(pattern: string | RegExp = ValidationRules.CREDIT_CARD_NUMBER.pattern) {
    this.rules.push(this.createRule("CREDIT_CARD_NUMBER", pattern));
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
       * @returns The pattern used by the specified validator.
       */
      getValidator: (name: Validator["name"]) => validators.find((validator) => validator.name === name)?.pattern,
    };
  }

  /**
   * Validates a given value against an array of validators.
   * @param value - The value to be validated.
   * @param validators - An array of validators with precompiled rules.
   * @returns True if the value passes all validators, false otherwise.
   * @private
   */
  private validate(value: string, validators: Validator[]) {
    return validators.every((validator) => validator.rule.test(value));
  }
}

/**
 * A factory function for creating a frozen instance of the Regex class.
 * @returns A frozen instance of the Regex class for building and applying regular expression validation rules.
 */
export const iWantRegex = () => Object.freeze(new Regex());
