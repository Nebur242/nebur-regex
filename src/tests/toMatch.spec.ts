import { iWantRegex } from "..";
import { describe, expect, it } from "@jest/globals";

describe("Match Validator", () => {
  const constraints = iWantRegex().toMatch(/03/).end();

  it("Should succeed", () => {
    expect(constraints.test("hello03world")).toBe(true);
  });

  it("Should fail", () => {
    expect(constraints.test("helloworld")).toBe(false);
  });

  it("produces stable results for stateful regular expressions", () => {
    const globalConstraints = iWantRegex().toMatch(/hello/g).end();

    expect(globalConstraints.test("hello")).toBe(true);
    expect(globalConstraints.test("hello")).toBe(true);
  });
});
