import { OptionsRule } from "../interfaces";
import { IpAddressFormat, IpAddressOptionsType } from "../types";

export class IpAddressOptions implements OptionsRule {
  private readonly format: IpAddressFormat;
  private readonly v4 =
    "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";
  private readonly v6 = `(?!^(?:(?:.*(?:::.*::|:::).*)|::|[0:]+[01]|.*[^:]:|[0-9a-fA-F](?:.*:.*){8}[0-9a-fA-F]|(?:[0-9a-fA-F]:){1,6}[0-9a-fA-F])$)^(?:(::|[0-9a-fA-F]{1,4}:{1,2})([0-9a-fA-F]{1,4}:{1,2}){0,6}([0-9a-fA-F]{1,4}|::)?)$`;

  private readonly patternFormat: Record<IpAddressFormat, RegExp> = {
    v4: new RegExp(`^${this.v4}$`),
    v6: new RegExp(`^${this.v6}$`),
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
