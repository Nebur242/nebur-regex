import { OptionsRule } from "../interfaces";
import { PasswordOptionsType } from "../types";

export class PasswordOptions implements OptionsRule {
  private readonly basePattern = "^[A-Za-z\\d@$!%*?&]{6,}$";

  private readonly minLength: number;
  private readonly maxLength: number;
  private readonly atLeastOneSpecialCharacter: boolean;
  private readonly atLeastOneNumber: boolean;
  private readonly atLeastOneUpperCase: boolean;
  private readonly atLeastOneLowerCase: boolean;
  private readonly disallowWhitespace: boolean;
  private readonly maxConsecutiveIdentical: number;
  private readonly maxConsecutiveSequential: number;
  private readonly bannedWords: string[];
  private readonly minUniqueCharacters: number;
  private readonly maxRepeatedCharacters: number;
  private readonly bannedSequences: string[];
  private readonly mustContains: string[];

  constructor(options?: Partial<PasswordOptionsType>) {
    this.minLength = options?.minLength || 6;
    this.maxLength = options?.maxLength || 16;
    this.atLeastOneSpecialCharacter = options?.atLeastOneSpecialCharacter ?? true;
    this.atLeastOneNumber = options?.atLeastOneNumber ?? true;
    this.atLeastOneUpperCase = options?.atLeastOneUpperCase ?? true;
    this.atLeastOneLowerCase = options?.atLeastOneLowerCase ?? true;
    this.disallowWhitespace = options?.disallowWhitespace ?? true;
    this.maxConsecutiveIdentical = options?.maxConsecutiveIdentical || 2;
    this.maxConsecutiveSequential = options?.maxConsecutiveSequential || 3;
    this.bannedWords = options?.bannedWords || [];
    this.minUniqueCharacters = options?.minUniqueCharacters || 0;
    this.maxRepeatedCharacters = options?.maxRepeatedCharacters || 2;
    this.bannedSequences = options?.bannedSequences || [];
    this.mustContains = options?.mustContains || [];
  }

  private applyOptionsToRegexPattern(regexPattern: string) {
    let updatedPattern = regexPattern;

    updatedPattern += `(?=${this.atLeastOneUpperCase ? "(?=.*[A-Z])" : ""}${this.atLeastOneLowerCase ? "(?=.*[a-z])" : ""}${this.atLeastOneNumber ? "(?=.*\\d)" : ""}${this.atLeastOneSpecialCharacter ? "(?=.*[@$!%*?&])" : ""}${this.disallowWhitespace ? "(?!\\s)" : ""})`;

    if (this.mustContains.length > 0) {
      const containsRegex = this.mustContains.map((char) => `(?=.*${char})`).join("");
      updatedPattern += `(?=${containsRegex})`;
    }

    if (this.maxConsecutiveIdentical > 1) {
      updatedPattern += `(?!.*(.)\\1{${this.maxConsecutiveIdentical - 1},})`;
    }

    if (this.maxConsecutiveSequential > 1) {
      updatedPattern += `(?!.*(${Array.from({ length: this.maxConsecutiveSequential - 1 }, (_, i) => String.fromCharCode(97 + i)).join("|")}))`;
    }

    if (this.bannedWords.length > 0) {
      updatedPattern += `(?!.*(${this.bannedWords.join("|")}))`;
    }

    if (this.minUniqueCharacters > 0) {
      updatedPattern += `(?=(?:.*?([A-Za-z\\d@$!%*?&])){${this.minUniqueCharacters},})`;
    }

    if (this.maxRepeatedCharacters > 1) {
      updatedPattern += `(?!.*(.)\\1{${this.maxRepeatedCharacters - 1},})`;
    }

    if (this.bannedSequences.length > 0) {
      updatedPattern += `(?!.*(${this.bannedSequences.join("|")}))`;
    }

    if (this.minLength && this.maxLength) {
      updatedPattern = `^${updatedPattern}{${this.minLength},${this.maxLength}}$`;
    }

    return updatedPattern;
  }

  getRule() {
    const optionsPattern = `(?=${this.atLeastOneUpperCase ? "(?=.*[A-Z])" : ""}${this.atLeastOneLowerCase ? "(?=.*[a-z])" : ""}${this.atLeastOneNumber ? "(?=.*\\d)" : ""}${this.atLeastOneSpecialCharacter ? "(?=.*[@$!%*?&])" : ""}${this.disallowWhitespace ? "(?!\\s)" : ""})`;
    const finalPattern = this.basePattern.replace(/^(\^|\^\\\[)/, `$1${optionsPattern}`);
    const pattern = this.applyOptionsToRegexPattern(finalPattern);
    return {
      pattern,
      rule: new RegExp(pattern),
    };
  }
}
