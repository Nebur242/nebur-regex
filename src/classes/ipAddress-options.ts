import { OptionsRule } from "../interfaces";
import { IpAddressFormat, IpAddressOptionsType, IpAddressType } from "../types";

export class IpAddressOptions implements OptionsRule {
  private readonly format: IpAddressFormat;
  private readonly validateCIDR: boolean;
  private readonly validateType: IpAddressType[] | undefined;

  // Updated IPv4 pattern with more precise octet validation
  private readonly v4Base =
    "(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}";

  // Enhanced IPv6 pattern compliant with RFC 5952
  private readonly v6Base =
    "(?:(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|" +
    "(?:[0-9a-fA-F]{1,4}:){1,7}:|" +
    "(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|" +
    "(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|" +
    "(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|" +
    "(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|" +
    "(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|" +
    "[0-9a-fA-F]{1,4}:(?:(?::[0-9a-fA-F]{1,4}){1,6})|" +
    ":(?:(?::[0-9a-fA-F]{1,4}){1,7}|:)|" +
    "fe80:(?::[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|" +
    "::(?:ffff(?::0{1,4}){0,1}:){0,1}(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])|" +
    "(?:[0-9a-fA-F]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9]))";

  // CIDR pattern for both IPv4 and IPv6
  private readonly v4CIDRSuffix = "(?:/(?:[0-9]|[1-2][0-9]|3[0-2]))?";
  private readonly v6CIDRSuffix = "(?:/(?:[0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?";

  // IP address type patterns
  private readonly ipv4Patterns = {
    private: [
      "^10\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$",
      "^172\\.(1[6-9]|2[0-9]|3[0-1])\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$",
      "^192\\.168\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$",
    ],
    loopback:
      "^127\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$",
    linkLocal:
      "^169\\.254\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$",
    multicast:
      "^2(?:2[4-9]|3[0-9])\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$",
  };

  private readonly ipv6Patterns = {
    loopback: "^::1$",
    linkLocal: "^fe[89aAbB][0-9a-fA-F]:.*$",
    multicast: "^ff[0-9a-fA-F]{2}:.*$",
  };

  constructor(options: IpAddressOptionsType) {
    this.format = options.withFormat;
    this.validateCIDR = options.validateCIDR || false;
    this.validateType = options.validateType;
  }

  private getBasePattern(format: IpAddressFormat): RegExp {
    let pattern: string;

    if (format === "v4") {
      pattern = this.validateCIDR ? `^${this.v4Base}${this.v4CIDRSuffix}$` : `^${this.v4Base}$`;
    } else if (format === "v6") {
      pattern = this.validateCIDR ? `^${this.v6Base}${this.v6CIDRSuffix}$` : `^${this.v6Base}$`;
    } else {
      // 'both'
      const v4Pattern = this.validateCIDR ? `${this.v4Base}${this.v4CIDRSuffix}` : this.v4Base;

      const v6Pattern = this.validateCIDR ? `${this.v6Base}${this.v6CIDRSuffix}` : this.v6Base;

      pattern = `^(?:${v4Pattern}|${v6Pattern})$`;
    }

    return new RegExp(pattern);
  }

  private getTypeSpecificPattern(): RegExp | null {
    if (!this.validateType || this.validateType.includes("any")) {
      return null; // No type filtering needed
    }

    const patterns: string[] = [];

    // Generate patterns based on IP type
    for (const type of this.validateType) {
      if (type === "public") {
        // Public is special - it's everything except private, loopback, etc.
        continue;
      }

      if (this.format === "v4" || this.format === "both") {
        if (type in this.ipv4Patterns) {
          if (Array.isArray(this.ipv4Patterns[type as keyof typeof this.ipv4Patterns])) {
            patterns.push(...(this.ipv4Patterns[type as keyof typeof this.ipv4Patterns] as string[]));
          } else {
            patterns.push(this.ipv4Patterns[type as keyof typeof this.ipv4Patterns] as string);
          }
        }
      }

      if (this.format === "v6" || this.format === "both") {
        if (type in this.ipv6Patterns) {
          patterns.push(this.ipv6Patterns[type as keyof typeof this.ipv6Patterns]);
        }
      }
    }

    if (this.validateType.includes("public")) {
      const nonPublicPatterns: string[] = [];

      if (this.format === "v4" || this.format === "both") {
        // Add all private, loopback, etc. for IPv4
        Object.values(this.ipv4Patterns).forEach((pattern) => {
          if (Array.isArray(pattern)) {
            nonPublicPatterns.push(...pattern);
          } else {
            nonPublicPatterns.push(pattern);
          }
        });
      }

      if (this.format === "v6" || this.format === "both") {
        // Add all non-public patterns for IPv6
        Object.values(this.ipv6Patterns).forEach((pattern) => {
          nonPublicPatterns.push(pattern);
        });
      }

      // Public IP is anything that doesn't match the non-public patterns
      // This is handled separately in the validate method
      return new RegExp(`^(?:${nonPublicPatterns.join("|")})$`);
    }

    return patterns.length ? new RegExp(`^(?:${patterns.join("|")})$`) : null;
  }

  getRule() {
    const basePattern = this.getBasePattern(this.format);
    const typePattern = this.getTypeSpecificPattern();

    // Create a custom validate function
    const validateFn = (value: string) => {
      // First check if it matches the base IP format
      if (!basePattern.test(value)) return false;

      // If no type validation is needed, we're done
      if (!typePattern) return true;

      // For CIDR notation, we need to strip the prefix before checking the IP type
      let ipToCheck = value;
      if (this.validateCIDR && value.includes("/")) {
        ipToCheck = value.split("/")[0];
      }

      // Check for public IPs (which are IPs that don't match any special ranges)
      if (this.validateType?.includes("public")) {
        return !typePattern.test(ipToCheck);
      }

      // Check for specific IP types
      return typePattern.test(ipToCheck);
    };

    // Create a dynamic RegExp object with a custom test method
    const dynamicRegExp = new RegExp(basePattern);

    // Override the test method
    dynamicRegExp.test = function (value: string) {
      return validateFn(value);
    };

    return {
      pattern: basePattern,
      rule: dynamicRegExp,
    };
  }
}
