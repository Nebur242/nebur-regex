import { OptionsRule } from "../interfaces";
import { DateFormat, DateOptionsType } from "../types";

export class DateOptions implements OptionsRule {
  private readonly format: DateFormat;
  private readonly strictValidation: boolean;
  private readonly rangeValidation?:
    | {
        before?: Date | string | undefined;
        after?: Date | string | undefined;
        inclusive?: boolean | undefined;
      }
    | undefined;

  // Regular expression patterns for different date formats
  private readonly monthDayYearPattern =
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$|^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$|^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$|^(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])-\d{4}$/;

  private readonly dayMonthYear =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$|^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$|^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$|^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/;

  private readonly yearMonthDay =
    /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$|^\d{4}\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])$|^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$|^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/;

  // ISO 8601 date format (YYYY-MM-DD and variations)
  private readonly iso8601 =
    /^(\d{4})-?(0[1-9]|1[0-2])-?(0[1-9]|[12][0-9]|3[01])(?:T([01][0-9]|2[0-3]):?([0-5][0-9]):?([0-5][0-9])(?:\.\d+)?(?:Z|[+-](?:[01][0-9]|2[0-3])(?::?[0-5][0-9])?)?)?$/;

  // Define the pattern format mapping with all supported formats
  private readonly patternFormat: Record<DateFormat, RegExp> = {
    "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY": this.monthDayYearPattern,
    "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY": this.dayMonthYear,
    "YYYY/MM/DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D": this.yearMonthDay,
    ISO8601: this.iso8601,
  };

  constructor(options: DateOptionsType) {
    this.format = options.withFormat;
    this.strictValidation = options.strictValidation ?? false;
    this.rangeValidation = options.rangeValidation;
  }

  private getPattern(format: DateFormat): RegExp {
    const pattern = this.patternFormat[format];
    if (!pattern) throw new Error("No format match found for the specified date format");
    return pattern;
  }

  private isValidDate(dateString: string, format: DateFormat): boolean {
    // Extract day, month, and year from the date string
    let day: number, month: number, year: number;

    if (format === "ISO8601") {
      // Handle ISO 8601 format
      const match = dateString.match(/^(\d{4})-?(\d{2})-?(\d{2})/)!;

      year = parseInt(match[1], 10);
      month = parseInt(match[2], 10);
      day = parseInt(match[3], 10);
    } else if (format === "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY") {
      // Handle MM/DD/YYYY format
      const separator = dateString.includes("/") ? "/" : "-";
      const parts = dateString.split(separator);
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (format === "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY") {
      // Handle DD/MM/YYYY format
      const separator = dateString.includes("/") ? "/" : "-";
      const parts = dateString.split(separator);
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else {
      // Handle YYYY/MM/DD format
      const separator = dateString.includes("/") ? "/" : "-";
      const parts = dateString.split(separator);
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    }

    // Determine the last day of the month
    // Handle leap years for February
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const lastDayOfMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Day must be valid for the given month
    return day >= 1 && day <= lastDayOfMonth[month - 1];
  }

  private isInRange(dateString: string, format: DateFormat): boolean {
    const parseDate = (value: string, valueFormat: DateFormat): Date => {
      if (valueFormat === "ISO8601") return new Date(value);

      const separator = value.includes("/") ? "/" : "-";
      const parts = value.split(separator).map((part) => parseInt(part, 10));
      let day: number;
      let month: number;
      let year: number;

      if (valueFormat === "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY") {
        [month, day, year] = parts;
      } else if (valueFormat === "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY") {
        [day, month, year] = parts;
      } else {
        [year, month, day] = parts;
      }

      return new Date(Date.UTC(year, month - 1, day));
    };

    const date = parseDate(dateString, format);

    // Check if the date is within the specified range
    const { before, after, inclusive = false } = this.rangeValidation!;

    if (before !== undefined) {
      const beforeDate = typeof before === "string" ? parseDate(before, format) : before;
      if (Number.isNaN(beforeDate.getTime())) return false;
      if (inclusive && date > beforeDate) return false;
      if (!inclusive && date >= beforeDate) return false;
    }

    if (after !== undefined) {
      const afterDate = typeof after === "string" ? parseDate(after, format) : after;
      if (Number.isNaN(afterDate.getTime())) return false;
      if (inclusive && date < afterDate) return false;
      if (!inclusive && date <= afterDate) return false;
    }

    return true;
  }

  getRule() {
    const basePattern = this.getPattern(this.format);

    // Create a dynamic RegExp object with a custom test method
    const dynamicRegExp = new RegExp(basePattern);

    // Override the test method to include additional validation
    dynamicRegExp.test = (value: string) => {
      // First check if it matches the base date format
      if (!basePattern.test(value)) return false;

      // If strict validation is enabled, verify the date is valid
      if (this.strictValidation && !this.isValidDate(value, this.format)) return false;

      // If range validation is specified, check if the date is within the range
      if (this.rangeValidation && !this.isInRange(value, this.format)) return false;

      return true;
    };

    return {
      pattern: basePattern,
      rule: dynamicRegExp,
    };
  }
}
