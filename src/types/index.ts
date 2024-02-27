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
  | "CREDIT_CARD_NUMBER"
  | "USERNAME"
  | "IP_ADDRESS"
  | "PASSWORD";

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

export type IpAddressOptionsType = {
  withFormat: IpAddressFormat;
};

export type DateOptionsType = {
  withFormat: DateFormat;
};

type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type PasswordOptionsType = RequireAtLeastOne<{
  readonly minLength: number;
  readonly maxLength: number;
  readonly atLeastOneSpecialCharacter: boolean;
  readonly atLeastOneNumber: boolean;
  readonly atLeastOneUpperCase: boolean;
  readonly atLeastOneLowerCase: boolean;
  readonly disallowWhitespace: boolean;
  readonly maxConsecutiveIdentical: number;
  readonly maxConsecutiveSequential: number;
  readonly bannedWords: string[];
  readonly minUniqueCharacters: number;
  readonly maxRepeatedCharacters: number;
  readonly bannedSequences: string[];
  readonly mustContains: string[];
}>;

export type CreateRegexOptions =
  | {
      name: Extract<PatternName, "PASSWORD">;
      options: PasswordOptionsType;
    }
  | {
      name: Extract<PatternName, "DATE">;
      options: DateOptionsType;
    }
  | {
      name: Extract<PatternName, "IP_ADDRESS">;
      options: IpAddressOptionsType;
    };

export type IpAddressFormat = "v4" | "v6" | "both";

export type DateFormat =
  | "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY"
  | "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY"
  | "YYYY/MM/DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D";
