export class RegexPatterns {
    static ALPHANUMERIC = /^([a-zA-Z0-9]+)$/;
    static EMAIL = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    static NUMERIC = /^([0-9]+)$/;
    static PHONE_NUMBER = /^\d{3}-\d{3}-\d{4}$/;
    static DATE = /^\d{4}-\d{2}-\d{2}$/;
    static URL = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
    static UPPERCASE = /^[A-Z]+$/;
    static LOWERCASE = /^[a-z]+$/;
    static HEX_COLOR = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    static CREDIT_CARD_NUMBER = /^\d{4}-?\d{4}-?\d{4}-?\d{4}$/;
}
  
export class ValidationRules {
    static ALPHANUMERIC = {
      name: "ALPHANUMERIC",
      pattern: RegexPatterns.ALPHANUMERIC,
    };
  
    static EMAIL = {
      name: "EMAIL",
      pattern: RegexPatterns.EMAIL,
    };
  
    static NUMERIC = {
      name: "NUMERIC",
      pattern: RegexPatterns.NUMERIC,
    };
  
    static PHONE_NUMBER = {
      name: "PHONE_NUMBER",
      pattern: RegexPatterns.PHONE_NUMBER,
    };
  
    static DATE = {
      name: "DATE",
      pattern: RegexPatterns.DATE,
    };
  
    static URL = {
      name: "URL",
      pattern: RegexPatterns.URL,
    };
  
    static UPPERCASE = {
      name: "UPPERCASE",
      pattern: RegexPatterns.UPPERCASE,
    };
  
    static LOWERCASE = {
      name: "LOWERCASE",
      pattern: RegexPatterns.LOWERCASE,
    };
  
    static HEX_COLOR = {
      name: "HEX_COLOR",
      pattern: RegexPatterns.HEX_COLOR,
    };
  
    static CREDIT_CARD_NUMBER = {
      name: "CREDIT_CARD_NUMBER",
      pattern: RegexPatterns.CREDIT_CARD_NUMBER,
    };
}
  
export class ValidatorFactory {
    static createValidator(name: PatternName, pattern: string | RegExp): Validator {
      return {
        name,
        pattern,
        rule: new RegExp(pattern),
      };
    }
}