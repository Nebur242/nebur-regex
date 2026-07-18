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
            withFormat: "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY",
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
            withFormat: "YYYY/MM/DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D",
          })
          .end();
        items.forEach((item) => {
          expect(constraints.test(item)).toBe(false);
        });
      });
    });
  });

  describe("Format: ISO8601", () => {
    const constraints = iWantRegex()
      .toBeDate({
        withFormat: "ISO8601",
      })
      .end();

    it("Should succeed with valid ISO8601 dates", () => {
      const validItems = [
        "2023-05-08",
        "2023-12-31",
        "2023-05-08T14:30:00",
        "2023-05-08T14:30:00Z",
        "2023-05-08T14:30:00+02:00",
        "20230508T143000Z",
      ];
      validItems.forEach((validItem) => {
        expect(constraints.test(validItem)).toBe(true);
      });
    });

    it("Should fail with invalid ISO8601 dates", () => {
      const invalidItems = [
        "2023/05/08", // Wrong separator
        "08-05-2023", // Wrong order
        "2023-13-01", // Invalid month
        "2023-05-32", // Invalid day
        "2023-05-08T25:00:00", // Invalid hour
        "not-a-date",
      ];
      invalidItems.forEach((invalidItem) => {
        expect(constraints.test(invalidItem)).toBe(false);
      });
    });
  });

  describe("Date validation with strict validation", () => {
    describe("Valid dates with strict validation", () => {
      const constraints = iWantRegex()
        .toBeDate({
          withFormat: "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY",
          strictValidation: true,
        })
        .end();

      it("Should succeed with valid dates", () => {
        const validItems = [
          "02/28/2023", // Valid February date
          "04/30/2023", // Valid April date
          "12/31/2023", // Valid December date
          "02/29/2024", // Valid February 29 (2024 is leap year)
        ];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should fail with invalid dates", () => {
        const invalidItems = [
          "02/31/2023", // February never has 31 days
          "02/29/2023", // February 29 in non-leap year
          "04/31/2023", // April only has 30 days
          "06/31/2023", // June only has 30 days
          "09/31/2023", // September only has 30 days
        ];
        invalidItems.forEach((invalidItem) => {
          expect(constraints.test(invalidItem)).toBe(false);
        });
      });
    });

    describe("Leap year validation", () => {
      const constraints = iWantRegex()
        .toBeDate({
          withFormat: "YYYY/MM/DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D",
          strictValidation: true,
        })
        .end();

      it("Should validate February 29th correctly in leap years", () => {
        // These are leap years
        expect(constraints.test("2020-02-29")).toBe(true);
        expect(constraints.test("2024-02-29")).toBe(true);
        expect(constraints.test("2000-02-29")).toBe(true); // Special case: divisible by 400 is leap year

        // These are not leap years
        expect(constraints.test("2023-02-29")).toBe(false);
        expect(constraints.test("2100-02-29")).toBe(false); // Special case: century not divisible by 400 is not leap year
        expect(constraints.test("2022-02-29")).toBe(false);
      });
    });
  });

  describe("Date validation with range validation", () => {
    describe("Dates after a specific date", () => {
      const constraints = iWantRegex()
        .toBeDate({
          withFormat: "YYYY/MM/DD | YYYY/M/D | YYYY-MM-DD | YYYY-M-D",
          strictValidation: true,
          rangeValidation: {
            after: "2023-01-01",
          },
        })
        .end();

      it("Should succeed with dates after 2023-01-01", () => {
        const validItems = ["2023-01-02", "2023-05-08", "2024-01-01", "2025-12-31"];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should fail with dates before or equal to 2023-01-01", () => {
        const invalidItems = [
          "2022-12-31",
          "2022-01-01",
          "2020-05-08",
          "2023-01-01", // Equal to the limit (inclusive by default)
        ];
        invalidItems.forEach((invalidItem) => {
          expect(constraints.test(invalidItem)).toBe(false);
        });
      });
    });

    describe("Dates before a specific date", () => {
      const constraints = iWantRegex()
        .toBeDate({
          withFormat: "MM/DD/YYYY | M/D/YYYY | MM-DD-YYYY | M-D-YYYY",
          strictValidation: true,
          rangeValidation: {
            before: "01/01/2024",
          },
        })
        .end();

      it("Should succeed with dates before 01/01/2024", () => {
        const validItems = ["12/31/2023", "01/01/2023", "05/08/2023", "12/31/2022"];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should fail with dates after or equal to 01/01/2024", () => {
        const invalidItems = [
          "01/02/2024",
          "05/08/2024",
          "12/31/2024",
          "01/01/2024", // Equal to the limit (inclusive by default)
        ];
        invalidItems.forEach((invalidItem) => {
          expect(constraints.test(invalidItem)).toBe(false);
        });
      });
    });

    describe("Dates between two dates (inclusive range)", () => {
      const constraints = iWantRegex()
        .toBeDate({
          withFormat: "ISO8601",
          strictValidation: true,
          rangeValidation: {
            after: "2023-01-01",
            before: "2023-12-31",
            inclusive: true,
          },
        })
        .end();

      it("Should succeed with dates in 2023 (inclusive)", () => {
        const validItems = [
          "2023-01-01", // Start of range (inclusive)
          "2023-05-08", // Middle of range
          "2023-12-31", // End of range (inclusive)
        ];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should fail with dates outside 2023", () => {
        const invalidItems = [
          "2022-12-31", // Just before range
          "2024-01-01", // Just after range
        ];
        invalidItems.forEach((invalidItem) => {
          expect(constraints.test(invalidItem)).toBe(false);
        });
      });
    });

    describe("Dates between two dates (exclusive range)", () => {
      const constraints = iWantRegex()
        .toBeDate({
          withFormat: "ISO8601",
          strictValidation: true,
          rangeValidation: {
            after: "2023-01-01",
            before: "2023-12-31",
            inclusive: false,
          },
        })
        .end();

      it("Should succeed with dates in 2023 (exclusive of endpoints)", () => {
        const validItems = [
          "2023-01-02", // Just after start
          "2023-05-08", // Middle of range
          "2023-12-30", // Just before end
        ];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should fail with dates outside range or on endpoints", () => {
        const invalidItems = [
          "2022-12-31", // Before range
          "2023-01-01", // Start of range (exclusive)
          "2023-12-31", // End of range (exclusive)
          "2024-01-01", // After range
        ];
        invalidItems.forEach((invalidItem) => {
          expect(constraints.test(invalidItem)).toBe(false);
        });
      });
    });
  });
});
