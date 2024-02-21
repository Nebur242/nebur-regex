/**
 * Represents a predefined set of pattern names used for validation.
 */
type PatternName =
  | "ALPHANUMERIC"
  | "CONTAINS"
  | "EMAIL"
  | "CUSTOM"
  | "DATE"
  | "NUMERIC"
  | "PHONE_NUMBER"
  | "URL"
  | "UPPERCASE"
  | "LOWERCASE"
  | "HEX_COLOR"
  | "CREDIT_CARD_NUMBER";

/**
 * Represents a validator with a name, pattern, and a precompiled regular expression rule.
 */
export type Validator = {
  /**
   * The name of the validator.
   * @type {PatternName}
   */
  name: PatternName;

  /**
   * The pattern used by the validator. It can be a string or a regular expression.
   * @type {string | RegExp}
   */
  pattern: string | RegExp;

  /**
   * The precompiled regular expression rule based on the provided pattern.
   * @type {RegExp}
   */
  rule: RegExp;
};

/**
 * Represents a simplified version of a validator without the precompiled regular expression rule.
 */
export type Rule = Omit<Validator, "rule">;
