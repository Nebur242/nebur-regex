import * as MRHGenerator from "..";
import { describe, expect, it } from "@jest/globals";

describe("Lowercase Validator", () => {
  const constraints = MRHGenerator.iWantRegex().toBeLowercase().end();

  it("Should succeed", () => {
    const validItems = ["hello", "http://hello:3000"];
    validItems.forEach((validItem) => {
      expect(constraints.test(validItem)).toBe(true);
    });
  });

  it("Should fail", () => {
    const invalidItems = ["Hello", "I am"];
    invalidItems.forEach((invalidItem) => {
      expect(constraints.test(invalidItem)).toBe(false);
    });
  });
});
