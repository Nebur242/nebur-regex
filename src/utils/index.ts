import { Validator } from "../types";

/**
 * A collection of predefined regular expression patterns for common validation scenarios.
 */
export class RegexPatterns {
  /**
   * Regular expression pattern for matching alphanumeric strings.
   * Allows only letters (both uppercase and lowercase) and numeric digits.
   * @type {RegExp}
   */
  static readonly ALPHANUMERIC: RegExp = /^([a-zA-Z0-9]+)$/;

  /**
   * Regular expression pattern for matching email addresses.
   * Validates email format based on common conventions.
   * @type {RegExp}
   */
  static readonly EMAIL: RegExp =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  /**
   * Regular expression pattern for matching numeric strings.
   * Allows only numeric digits.
   * @type {RegExp}
   */
  static readonly NUMERIC: RegExp = /^([0-9]+)$/;

  /**
   * Regular expression pattern for matching phone numbers.
   * Validates various phone number formats including international ones.
   * @type {RegExp}
   */
  static readonly PHONE_NUMBER: RegExp =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

  /**
   * Regular expression pattern for matching dates in MM/DD/YYYY format.
   * Allows leading zeros for months and days.
   * @type {RegExp}
   */
  static readonly DATE: RegExp = /^(0?[1-9]|1[0-2])[\/-](0?[1-9]|[12]\d|3[01])[\/-]\d{4}$/;

  /**
   * Regular expression pattern for matching URLs.
   * Supports various URL formats including HTTP and HTTPS.
   * @type {RegExp}
   */
  static readonly URL: RegExp = /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/i;

  /**
   * Regular expression pattern for matching uppercase strings with special characters.
   * Allows only uppercase letters, numbers, and specified special characters.
   * @type {RegExp}
   */
  static readonly UPPERCASE: RegExp = /^[A-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*$/;

  /**
   * Regular expression pattern for matching lowercase strings with special characters.
   * Allows only lowercase letters, numbers, and specified special characters.
   * @type {RegExp}
   */
  static readonly LOWERCASE: RegExp = /^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;

  /**
   * Regular expression pattern for matching hex color codes.
   * Supports both short (3 characters) and long (6 characters) hex color codes.
   * @type {RegExp}
   */
  static readonly HEX_COLOR: RegExp = /^#([0-9a-f]{3}){1,2}$/i;

  /**
   * Regular expression pattern for matching credit card numbers.
   * Allows various formats of credit card numbers including spaces and dashes.
   * @type {RegExp}
   */
  static readonly CREDIT_CARD_NUMBER: RegExp = /^(?:\d[ -.]*?){13,16}$/;
}

/**
 * A collection of predefined validation rules with names and corresponding patterns.
 * These rules can be used in conjunction with the ValidatorFactory to create validator instances.
 */
export class ValidationRules {
  /**
   * Represents an alphanumeric validation rule.
   * Allows only alphanumeric characters.
   */
  static readonly ALPHANUMERIC = {
    name: "ALPHANUMERIC",
    pattern: RegexPatterns.ALPHANUMERIC,
  };

  /**
   * Represents an email validation rule.
   * Validates email addresses based on a predefined pattern.
   */
  static readonly EMAIL = {
    name: "EMAIL",
    pattern: RegexPatterns.EMAIL,
  };

  /**
   * Represents a numeric validation rule.
   * Allows only numeric characters.
   */
  static readonly NUMERIC = {
    name: "NUMERIC",
    pattern: RegexPatterns.NUMERIC,
  };

  /**
   * Represents a phone number validation rule.
   * Validates phone numbers based on a predefined pattern.
   */
  static readonly PHONE_NUMBER = {
    name: "PHONE_NUMBER",
    pattern: RegexPatterns.PHONE_NUMBER,
  };

  /**
   * Represents a date validation rule.
   * Validates dates based on a predefined pattern.
   */
  static readonly DATE = {
    name: "DATE",
    pattern: RegexPatterns.DATE,
  };

  /**
   * Represents a URL validation rule.
   * Validates URLs based on a predefined pattern.
   */
  static readonly URL = {
    name: "URL",
    pattern: RegexPatterns.URL,
  };

  /**
   * Represents an uppercase validation rule.
   * Allows only uppercase letters.
   */
  static readonly UPPERCASE = {
    name: "UPPERCASE",
    pattern: RegexPatterns.UPPERCASE,
  };

  /**
   * Represents a lowercase validation rule.
   * Allows only lowercase letters.
   */
  static readonly LOWERCASE = {
    name: "LOWERCASE",
    pattern: RegexPatterns.LOWERCASE,
  };

  /**
   * Represents a hex color validation rule.
   * Validates hex color codes based on a predefined pattern.
   */
  static readonly HEX_COLOR = {
    name: "HEX_COLOR",
    pattern: RegexPatterns.HEX_COLOR,
  };

  /**
   * Represents a credit card number validation rule.
   * Validates credit card numbers based on a predefined pattern.
   */
  static readonly CREDIT_CARD_NUMBER = {
    name: "CREDIT_CARD_NUMBER",
    pattern: RegexPatterns.CREDIT_CARD_NUMBER,
  };
}

/**
 * A factory class for creating validators.
 */
export class ValidatorFactory {
  /**
   * Creates a new validator instance.
   * @param name - The name of the validator.
   * @param pattern - The pattern used by the validator. It can be a string or a regular expression.
   * @returns A validator instance with the specified name, pattern, and a precompiled regular expression rule.
   */
  static createValidator(name: Validator["name"], pattern: string | RegExp): Validator {
    return {
      /**
       * The name of the validator.
       * @type {Validator["name"]}
       */
      name,
      /**
       * The pattern used by the validator. It can be a string or a regular expression.
       * @type {string | RegExp}
       */
      pattern,
      /**
       * The precompiled regular expression rule based on the provided pattern.
       * @type {RegExp}
       */
      rule: new RegExp(pattern),
    };
  }
}
