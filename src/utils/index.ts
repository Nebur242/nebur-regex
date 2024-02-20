import { Validator } from "../types";

export class RegexPatterns {
  static readonly ALPHANUMERIC = /^([a-zA-Z0-9]+)$/;
  static readonly EMAIL =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  static readonly NUMERIC = /^([0-9]+)$/;
  static readonly PHONE_NUMBER =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
  static readonly DATE = /^(0?[1-9]|1[0-2])[\/-](0?[1-9]|[12]\d|3[01])[\/-]\d{4}$/;
  static readonly URL = /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/i;
  static readonly UPPERCASE = /^[A-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*$/;
  static readonly LOWERCASE = /^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
  static readonly HEX_COLOR = /^#([0-9a-f]{3}){1,2}$/i;
  static readonly CREDIT_CARD_NUMBER = /^(?:\d[ -.]*?){13,16}$/;
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
