import { describe, expect, it } from "@jest/globals";
import { DateOptions, IpAddressOptions, PasswordOptions } from "../classes";
import { iWantRegex } from "..";
import { RegexOptionsFactory } from "../utils";

describe("Option validator edge cases", () => {
  it("supports custom date and IP patterns", () => {
    expect(
      iWantRegex()
        .toBeDate(/^\d{4}$/)
        .end()
        .test("2024"),
    ).toBe(true);
    expect(iWantRegex().toBeIpAddress("^local$").end().test("local")).toBe(true);
  });

  it("ignores structurally empty option objects", () => {
    expect(
      iWantRegex()
        .toBeDate({} as never)
        .end()
        .test("anything"),
    ).toBe(true);
    expect(
      iWantRegex()
        .toBeIpAddress({} as never)
        .end()
        .test("anything"),
    ).toBe(true);
  });

  it("rejects unknown option factory names and date formats", () => {
    expect(() => RegexOptionsFactory.createRegexOptions({ name: "UNKNOWN" } as never)).toThrow("No name matched");
    expect(() => new DateOptions({ withFormat: "UNKNOWN" } as never).getRule()).toThrow("No format match");
  });

  it("covers strict parsing for every separator and ordering", () => {
    const dayFirst = new DateOptions({
      withFormat: "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY",
      strictValidation: true,
    }).getRule();
    const yearFirst = new DateOptions({
      withFormat: "YYYY/MM/DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D",
      strictValidation: true,
    }).getRule();

    expect(dayFirst.rule.test("31-12-2024")).toBe(true);
    expect(dayFirst.rule.test("31/02/2024")).toBe(false);
    expect(yearFirst.rule.test("2024/02/29")).toBe(true);
    expect(yearFirst.rule.test("2023-02-29")).toBe(false);

    const monthFirst = new DateOptions({
      withFormat: "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY",
      strictValidation: true,
    }).getRule();
    expect(monthFirst.rule.test("12-31-2024")).toBe(true);
  });

  it("rejects invalid date range boundaries", () => {
    const invalidBefore = new DateOptions({
      withFormat: "ISO8601",
      rangeValidation: { before: "not-a-date" },
    }).getRule();
    const invalidAfter = new DateOptions({
      withFormat: "ISO8601",
      rangeValidation: { after: new Date("invalid") },
    }).getRule();
    const dayFirstRange = new DateOptions({
      withFormat: "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY",
      rangeValidation: { before: new Date(Date.UTC(2025, 0, 1)), inclusive: true },
    }).getRule();

    expect(invalidBefore.rule.test("2024-01-01")).toBe(false);
    expect(invalidAfter.rule.test("2024-01-01")).toBe(false);
    expect(dayFirstRange.rule.test("31/12/2024")).toBe(true);
  });

  it("covers all IP type families, any, and CIDR type filtering", () => {
    const linkLocal = new IpAddressOptions({
      withFormat: "both",
      validateType: ["linkLocal"],
    }).getRule();
    const multicast = new IpAddressOptions({
      withFormat: "both",
      validateType: ["multicast"],
    }).getRule();
    const any = new IpAddressOptions({ withFormat: "v4", validateType: ["any"] }).getRule();
    const privateCidr = new IpAddressOptions({
      withFormat: "v4",
      validateCIDR: true,
      validateType: ["private"],
    }).getRule();
    const publicV6 = new IpAddressOptions({
      withFormat: "v6",
      validateType: ["public"],
    }).getRule();
    const v6LinkLocal = new IpAddressOptions({
      withFormat: "v6",
      validateType: ["linkLocal"],
    }).getRule();
    const unknownType = new IpAddressOptions({
      withFormat: "v4",
      validateType: ["unknown" as never],
    }).getRule();

    expect(linkLocal.rule.test("169.254.1.1")).toBe(true);
    expect(linkLocal.rule.test("fe80::1")).toBe(true);
    expect(multicast.rule.test("224.0.0.1")).toBe(true);
    expect(multicast.rule.test("ff02::1")).toBe(true);
    expect(any.rule.test("8.8.8.8")).toBe(true);
    expect(privateCidr.rule.test("10.0.0.0/8")).toBe(true);
    expect(publicV6.rule.test("2001:4860:4860::8888")).toBe(true);
    expect(publicV6.rule.test("not-an-ip")).toBe(false);
    expect(v6LinkLocal.rule.test("fe80::1")).toBe(true);
    expect(unknownType.rule.test("8.8.8.8")).toBe(true);
  });

  it("builds password rules with defaults and every optional constraint", () => {
    expect(new PasswordOptions().getRule().rule).toBeInstanceOf(RegExp);

    const configured = new PasswordOptions({
      minLength: 8,
      maxLength: 24,
      atLeastOneSpecialCharacter: false,
      atLeastOneNumber: false,
      atLeastOneUpperCase: false,
      atLeastOneLowerCase: false,
      disallowWhitespace: false,
      maxConsecutiveIdentical: 3,
      maxConsecutiveSequential: 4,
      bannedWords: ["password"],
      minUniqueCharacters: 4,
      maxRepeatedCharacters: 3,
      bannedSequences: ["abcd"],
      mustContains: ["x"],
    }).getRule();

    expect(configured.rule).toBeInstanceOf(RegExp);

    const minimal = new PasswordOptions({
      minLength: 0,
      maxLength: 0,
      maxConsecutiveIdentical: 1,
      maxConsecutiveSequential: 1,
      maxRepeatedCharacters: 1,
    }).getRule();

    expect(minimal.rule).toBeInstanceOf(RegExp);
  });

  it("creates password rules through the option factory", () => {
    const password = RegexOptionsFactory.createRegexOptions({
      name: "PASSWORD",
      options: { minLength: 8 },
    });

    expect(password.rule).toBeInstanceOf(RegExp);
  });
});
