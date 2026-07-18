import { iWantRegex } from "..";
import { describe, expect, test } from "@jest/globals";

describe("MRH Validator", () => {
  test("Should return all validators", () => {
    const validators = iWantRegex()
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
    const constraints = iWantRegex().toBeAlphanumeric().end();
    const alphanumericPattern = constraints.getValidator("ALPHANUMERIC");
    expect(alphanumericPattern).toEqual(/^([a-zA-Z0-9]+)$/);
  });

  test("Should not expose the finalized validator collection for mutation", () => {
    const constraints = iWantRegex().toBeNumeric().end();
    const validators = constraints.getValidators();

    validators.length = 0;

    expect(constraints.getValidators()).toHaveLength(1);
    expect(constraints.test("123")).toBe(true);
  });
});
