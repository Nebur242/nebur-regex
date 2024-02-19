import { Validator, Rule } from "./types";
import { RegexPatterns, ValidationRules, ValidatorFactory } from "./utils";

class Regex {
  private rules: Rule[] = [];

  private mergeValidators(validators: Validator[], rule: Rule): Validator[] {
    return [...validators, ValidatorFactory.createValidator(rule.name, rule.pattern)];
  }

  private createRule(name: Validator["name"], pattern: string | RegExp): Rule {
    return {
      name,
      pattern,
    };
  }

  toBeAlphanumeric() {
    this.rules.push(this.createRule("ALPHANUMERIC", RegexPatterns.ALPHANUMERIC));
    return this;
  }

  toBeEmail(pattern: string | RegExp = ValidationRules.EMAIL.pattern) {
    this.rules.push(this.createRule("EMAIL", pattern));
    return this;
  }

  toContains(value: string) {
    this.rules.push(this.createRule("CONTAINS", value));
    return this;
  }

  toMatch(pattern: string | RegExp) {
    this.rules.push(this.createRule("CUSTOM", pattern));
    return this;
  }

  toBeNumeric() {
    this.rules.push(this.createRule("NUMERIC", RegexPatterns.NUMERIC));
    return this;
  }

  toBePhoneNumber(pattern: string | RegExp = ValidationRules.PHONE_NUMBER.pattern) {
    this.rules.push(this.createRule("PHONE_NUMBER", pattern));
    return this;
  }

  toBeDate(pattern: string | RegExp = ValidationRules.DATE.pattern) {
    this.rules.push(this.createRule("DATE", pattern));
    return this;
  }

  toBeURL() {
    this.rules.push(this.createRule("URL", RegexPatterns.URL));
    return this;
  }

  toBeUppercase() {
    this.rules.push(this.createRule("UPPERCASE", RegexPatterns.UPPERCASE));
    return this;
  }

  toBeLowercase() {
    this.rules.push(this.createRule("LOWERCASE", RegexPatterns.LOWERCASE));
    return this;
  }

  toBeHexColor() {
    this.rules.push(this.createRule("HEX_COLOR", RegexPatterns.HEX_COLOR));
    return this;
  }

  toBeCreditCardNumber() {
    this.rules.push(this.createRule("CREDIT_CARD_NUMBER", RegexPatterns.CREDIT_CARD_NUMBER));
    return this;
  }

  private validate(value: string, validators: Validator[]) {
    return validators.every((validator) => validator.rule.test(value));
  }

  end() {
    const validators = this.rules.reduce<Validator[]>((prev, curr) => this.mergeValidators(prev, curr), []);
    return {
      test: (value: string) => this.validate(value, validators),
      getValidators: () => validators,
      getValidator: (name: Validator["name"]) => validators.find((validator) => validator.name === name)?.pattern,
    };
  }
}
export const iWantRegex = () => Object.freeze(new Regex());
