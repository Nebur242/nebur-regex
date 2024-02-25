import { iWantRegex } from "..";
import { describe, expect, it } from "@jest/globals";

describe("Date Validator", () => {
  describe("Default date validation", () => {
    const constraints = iWantRegex().toBeDate().end();

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

  describe("Date validation with specific format", () => {
    describe("Format: DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY", () => {
      it("Should succeed", () => {
        const items = ["05/08/2023", "5/8/2023", "05-08-2023", "5-8-2023"];
        const constraints = iWantRegex()
          .toBeDate({
            withFormat: "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY",
          })
          .end();
        items.forEach((item) => {
          expect(constraints.test(item)).toBe(true);
        });
      });

      it("Should fail", () => {
        const items = ["32/08/2023", "5/15/2023", "029-08-2023", "5-8-20293"];
        const constraints = iWantRegex()
          .toBeDate({
            withFormat: "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY",
          })
          .end();
        items.forEach((item) => {
          expect(constraints.test(item)).toBe(false);
        });
      });
    });

    describe("Format: MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY", () => {
      it("Should succeed", () => {
        const items = ["08/05/2023", "8/5/2023", "08-05-2023", "8-5-2023"];
        const constraints = iWantRegex()
          .toBeDate({
            withFormat: "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY",
          })
          .end();
        items.forEach((item) => {
          expect(constraints.test(item)).toBe(true);
        });
      });

      it("Should fail", () => {
        const items = ["32/02/2022", "15/15/2022", "15-02-22", "2022-02-15-"];
        const constraints = iWantRegex()
          .toBeDate({
            withFormat: "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY",
          })
          .end();
        items.forEach((item) => {
          expect(constraints.test(item)).toBe(false);
        });
      });
    });

    describe("Format: YYYY/MM/DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D", () => {
      it("Should succeed", () => {
        const items = ["2022/02/15", "2022/2/5", "2022-02-15", "2022-2-5"];
        const constraints = iWantRegex()
          .toBeDate({
            withFormat: "YYYY/MM/DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D",
          })
          .end();
        items.forEach((item) => {
          expect(constraints.test(item)).toBe(true);
        });
      });

      it("Should fail", () => {
        const items = ["2022/02/32", "2022/13/05", "2022-02-15-", "2022-02-32"];
        const constraints = iWantRegex()
          .toBeDate({
            withFormat: "DD/MM/YYYY | D/M/YYYY | DD-MM-YYYY | D-M-YYYY",
          })
          .end();
        items.forEach((item) => {
          expect(constraints.test(item)).toBe(false);
        });
      });
    });
  });
});
