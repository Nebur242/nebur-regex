import * as MRHGenerator from "..";
import { describe, expect, it } from "@jest/globals";

describe("HexColor Validator", () => {
  const constraints = MRHGenerator.iWantRegex().toBeHexColor().end();

  it("Should succeed", () => {
    const validItems = [
      "#123456",
      "#aabbcc",
      "#FF9900",
      "#00ff00",
      "#1a2B3c",
      "#FFFFFF",
      "#000000",
      "#F00",
      "#0a1",
      "#987",
      "#123a4b",
    ];
    validItems.forEach((validItem) => {
      expect(constraints.test(validItem)).toBe(true);
    });
  });

  it("Should fail", () => {
    const invalidItems = [
      "123456", // Missing #
      "aabbcc", // Missing #
      "#FFG900", // Invalid character G
      "#00ff00ff", // Too long
      "#1a2B3c4d5e6", // Too long
      "#12", // Too short
      "#1234567", // Too short
      "invalid", // Not a hex color
      "rgb(255, 0, 0)", // Not a hex color
      "#12g", // Invalid character g
      "#12!",
    ];
    invalidItems.forEach((invalidItem) => {
      expect(constraints.test(invalidItem)).toBe(false);
    });
  });
});
