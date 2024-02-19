import { Validator } from "../types";

export class RegexPatterns {
  static readonly ALPHANUMERIC = /^([a-zA-Z0-9]+)$/;
  static readonly EMAIL = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  static readonly NUMERIC = /^([0-9]+)$/;
  static readonly PHONE_NUMBER = /^\d{3}-\d{3}-\d{4}$/;
  static readonly DATE = /^\d{4}-\d{2}-\d{2}$/;
  static readonly URL = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\\/?%&=]*)?$/;
  static readonly UPPERCASE = /^[A-Z]+$/;
  static readonly LOWERCASE = /^[a-z]+$/;
  static readonly HEX_COLOR = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  static readonly CREDIT_CARD_NUMBER = /^\d{4}-?\d{4}-?\d{4}-?\d{4}$/;
}

export class ValidationRules {
  static readonly ALPHANUMERIC = {
    name: "ALPHANUMERIC",
    pattern: RegexPatterns.ALPHANUMERIC,
  };

  static readonly EMAIL = {
    name: "EMAIL",
    pattern: RegexPatterns.EMAIL,
  };

  static readonly NUMERIC = {
    name: "NUMERIC",
    pattern: RegexPatterns.NUMERIC,
  };

  static readonly PHONE_NUMBER = {
    name: "PHONE_NUMBER",
    pattern: RegexPatterns.PHONE_NUMBER,
  };

  static readonly DATE = {
    name: "DATE",
    pattern: RegexPatterns.DATE,
  };

  static readonly URL = {
    name: "URL",
    pattern: RegexPatterns.URL,
  };

  static readonly UPPERCASE = {
    name: "UPPERCASE",
    pattern: RegexPatterns.UPPERCASE,
  };

  static readonly LOWERCASE = {
    name: "LOWERCASE",
    pattern: RegexPatterns.LOWERCASE,
  };

  static readonly HEX_COLOR = {
    name: "HEX_COLOR",
    pattern: RegexPatterns.HEX_COLOR,
  };

  static readonly CREDIT_CARD_NUMBER = {
    name: "CREDIT_CARD_NUMBER",
    pattern: RegexPatterns.CREDIT_CARD_NUMBER,
  };
}

export class ValidatorFactory {
  static createValidator(name: Validator["name"], pattern: string | RegExp): Validator {
    return {
      name,
      pattern,
      rule: new RegExp(pattern),
    };
  }
}
