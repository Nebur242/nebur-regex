import * as MRHGenerator from "..";
import { describe, expect, it } from "@jest/globals";

describe("Date Validator", () => {
  const constraints = MRHGenerator.iWantRegex().toBeDate().end();

  //only format: MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY
  it("Should succeed", () => {
    const validItems = ["02/15/2022", "2/5/2022", "02-15-2022", "2-5-2022"];
    validItems.forEach((validItem) => {
      expect(constraints.test(validItem)).toBe(true);
    });
  });

  it("Should fail", () => {
    const invalidItems = ["2022/02/15", "2022-02-15", "14/2/2023", "14-2-2023", "10-32-2023"];
    invalidItems.forEach((invalidItem) => {
      expect(constraints.test(invalidItem)).toBe(false);
    });
  });
});
