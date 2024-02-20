import * as MRHGenerator from "..";
import { describe, expect, it } from "@jest/globals";

describe("Url Validator", () => {
  const constraints = MRHGenerator.iWantRegex().toBeDate().end();

  //only format: MM/DD/YYYY | M/D/YYYY
  it("Should succeed", () => {
    const validItems = ["02/15/2022", "2/5/2022"];
    validItems.forEach((validItem) => {
      if (!constraints.test(validItem)) console.log(validItem);
      expect(constraints.test(validItem)).toBe(true);
    });
  });

  it("Should fail", () => {
    const invalidItems = ["2022/02/15", "2022-02-15"];
    invalidItems.forEach((invalidItem) => {
      if (constraints.test(invalidItem)) console.log(invalidItem);
      expect(constraints.test(invalidItem)).toBe(false);
    });
  });
});
