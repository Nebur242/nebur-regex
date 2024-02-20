import * as MRHGenerator from "..";
import { describe, expect, it } from "@jest/globals";

describe("Alphanumeric Validator", () => {
  const constraints = MRHGenerator.iWantRegex().toBeAlphanumeric().end();

  it("should success", () => {
    const validItems = ["abc123", "JohnDoe2022", "user123", "Alphanumeric567", "Test123", "123456"];

    validItems.forEach((validItem) => {
      expect(constraints.test(validItem)).toBe(true);
    });
  });

  it("Should fail", () => {
    const invalidItems = ["contains space", "special!characters", "@symbol", "Alphanumeric 567", "Test-123", "123 456"];

    invalidItems.forEach((invalidItem) => {
      expect(constraints.test(invalidItem)).toBe(false);
    });
  });
});
