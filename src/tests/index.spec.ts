import * as MRHGenerator from "..";

import { describe, expect, test } from "@jest/globals";
describe("MRH Validator", () => {
  test("Should validate alphanumeric pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toBeAlphanumeric().end();
    expect(constraints.test("abc123")).toBe(true);
    expect(constraints.test("abc#123")).toBe(false);
  });

  test("Should validate email pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toBeEmail().end();
    expect(constraints.test("test@example.com")).toBe(true);
    expect(constraints.test("invalid-email")).toBe(false);
  });

  test("Should validate contains pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toContains("03").end();
    expect(constraints.test("hello03world")).toBe(true);
    expect(constraints.test("helloworld")).toBe(false);
  });

  test("Should validate custom pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toMatch(/03/).end();
    expect(constraints.test("custom03pattern")).toBe(true);
    expect(constraints.test("custompattern")).toBe(false);
  });

  test("Should validate numeric pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toBeNumeric().end();
    expect(constraints.test("123")).toBe(true);
    expect(constraints.test("abc")).toBe(false);
  });

  test("Should validate phone number pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toBePhoneNumber().end();
    expect(constraints.test("123-456-7890")).toBe(true);
    expect(constraints.test("invalid-number")).toBe(false);
  });

  test("Should validate date pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toBeDate().end();
    expect(constraints.test("2022-02-18")).toBe(true);
    expect(constraints.test("invalid-date")).toBe(false);
  });

  test("Should validate URL pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toBeURL().end();
    expect(constraints.test("https://www.example.com")).toBe(true);
    expect(constraints.test("invalid-url")).toBe(false);
  });

  test("Should validate uppercase pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toBeUppercase().end();
    expect(constraints.test("ABC")).toBe(true);
    expect(constraints.test("abc")).toBe(false);
  });

  test("Should validate lowercase pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toBeLowercase().end();
    expect(constraints.test("abc")).toBe(true);
    expect(constraints.test("ABC")).toBe(false);
  });

  test("Should validate hex color pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toBeHexColor().end();
    expect(constraints.test("#1a2B3c")).toBe(true);
    expect(constraints.test("#invalid-color")).toBe(false);
  });

  test("Should validate credit card number pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toBeCreditCardNumber().end();
    expect(constraints.test("1234-5678-9012-3456")).toBe(true);
    expect(constraints.test("invalid-card-number")).toBe(false);
  });

  test("Should return all validators", () => {
    const validators = MRHGenerator.iWantRegex()
      .toBeAlphanumeric()
      .toContains("03")
      .toBeEmail()
      .toMatch(/03/)
      .toBeNumeric()
      .toBePhoneNumber()
      .toBeDate()
      .toBeURL()
      .toBeUppercase()
      .toBeLowercase()
      .toBeHexColor()
      .toBeCreditCardNumber()
      .end()
      .getValidators();

    expect(validators).toHaveLength(12);
  });

  test("Should return specific validator pattern", () => {
    const constraints = MRHGenerator.iWantRegex().toBeAlphanumeric().end();
    const alphanumericPattern = constraints.getValidator("ALPHANUMERIC");
    expect(alphanumericPattern).toEqual(/^([a-zA-Z0-9]+)$/);
  });
});
