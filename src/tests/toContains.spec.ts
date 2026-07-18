import { iWantRegex } from "..";
import { describe, expect, it } from "@jest/globals";

describe("Contains Validator", () => {
  const constraints = iWantRegex().toContains("03").end();

  it("Should succeed", () => {
    expect(constraints.test("hello03world")).toBe(true);
  });

  it("Should fail", () => {
    expect(constraints.test("helloworld")).toBe(false);
  });

  it("treats regex metacharacters as literal text", () => {
    const literalDot = iWantRegex().toContains(".").end();

    expect(literalDot.test("example.com")).toBe(true);
    expect(literalDot.test("examplecom")).toBe(false);
  });
});
