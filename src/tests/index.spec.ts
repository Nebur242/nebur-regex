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
});
