import { OptionsRule } from "../interfaces";
import { IpAddressFormat, IpAddressOptionsType } from "../types";

export class IpAddressOptions implements OptionsRule {
  private readonly format: IpAddressFormat;
  private readonly v6segment = "[a-fA-F\\d]{1,4}";
  private readonly v4 =
    "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
  private readonly v6 = `
  (?:
  (?:${this.v6segment}:){7}(?:${this.v6segment}|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
  (?:${this.v6segment}:){6}(?:${this.v4}|:${this.v6segment}|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
  (?:${this.v6segment}:){5}(?::${this.v4}|(?::${this.v6segment}){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
  (?:${this.v6segment}:){4}(?:(?::${this.v6segment}){0,1}:${this.v4}|(?::${this.v6segment}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
  (?:${this.v6segment}:){3}(?:(?::${this.v6segment}){0,2}:${this.v4}|(?::${this.v6segment}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
  (?:${this.v6segment}:){2}(?:(?::${this.v6segment}){0,3}:${this.v4}|(?::${this.v6segment}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
  (?:${this.v6segment}:){1}(?:(?::${this.v6segment}){0,4}:${this.v4}|(?::${this.v6segment}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
  (?::(?:(?::${this.v6segment}){0,5}:${this.v4}|(?::${this.v6segment}){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
  )(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
  `
    .replace(/\s*\/\/.*$/gm, "")
    .replace(/\n/g, "")
    .trim();

  private readonly patternFormat: Record<IpAddressFormat, RegExp> = {
    v4: new RegExp(`^${this.v4}$`),
    v6: new RegExp(`^${this.v6}$`),
    both: new RegExp(`(?:^${this.v4}$)|(?:^${this.v6}$)`),
  };

  constructor(options: IpAddressOptionsType) {
    this.format = options.withFormat;
  }

  private getPattern(format: IpAddressFormat) {
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
