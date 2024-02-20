import * as MRHGenerator from "..";
import { describe, expect, it } from "@jest/globals";

describe("Numeric Validator", () => {
  const constraints = MRHGenerator.iWantRegex().toBeNumeric().end();

  it("Should succeed", () => {
    expect(constraints.test("123")).toBe(true);
  });

  it("Should fail", () => {
    expect(constraints.test("abc")).toBe(false);
  });
});
