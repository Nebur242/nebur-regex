import * as MRHGenerator from "..";
import { describe, expect, it } from "@jest/globals";

describe("Match Validator", () => {
  const constraints = MRHGenerator.iWantRegex().toMatch(/03/).end();

  it("Should succeed", () => {
    expect(constraints.test("hello03world")).toBe(true);
  });

  it("Should fail", () => {
    expect(constraints.test("helloworld")).toBe(false);
  });
});
