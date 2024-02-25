import { iWantRegex } from "..";
import { describe, expect, it } from "@jest/globals";

describe("Uppercase Validator", () => {
  const constraints = iWantRegex().toBeUppercase().end();

  it("Should succeed", () => {
    const validItems = ["HELLO", "HTTP://LOCALHOST:3000"];
    validItems.forEach((validItem) => {
      expect(constraints.test(validItem)).toBe(true);
    });
  });

  it("Should fail", () => {
    const invalidItems = ["HELLo", "I Am"];
    invalidItems.forEach((invalidItem) => {
      expect(constraints.test(invalidItem)).toBe(false);
    });
  });
});
