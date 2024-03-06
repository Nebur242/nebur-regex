import { OptionsRule } from "../interfaces";
import { DateFormat, DateOptionsType } from "../types";

export class DateOptions implements OptionsRule {
  private readonly format: DateFormat;
  private readonly monthDayYearPattern =
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$|^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$|^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$|^(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])-\d{4}$/;
  private readonly dayMonthYear =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$|^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$|^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$|^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/;
  private readonly yearMonthDay =
    /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$|^\d{4}\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])$|^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$|^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/;

  private readonly patternFormat: Record<DateFormat, RegExp> = {
    "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY": this.monthDayYearPattern,
    "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY": this.dayMonthYear,
    "YYYY/MM/DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D": this.yearMonthDay,
  };

  constructor(options: DateOptionsType) {
    this.format = options.withFormat;
  }

  private getPattern(format: DateFormat) {
    const pattern = this.patternFormat[format];
    if (!pattern) throw new Error("no format match :(");
    return pattern;
  }

  getRule() {
    return {
      pattern: this.getPattern(this.format),
      rule: this.getPattern(this.format),
    };
  }
}
