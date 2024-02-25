import { iWantRegex } from "..";
import { describe, expect, it } from "@jest/globals";

describe("Phone Number Validator", () => {
  const constraints = iWantRegex().toBePhoneNumber().end();

  it("Should succeed", () => {
    const validItems = [
      "+42 555.123.4567",
      "+1-(800)-123-4567",
      "+7 555 1234567",
      "+7(926)1234567",
      "(926) 1234567",
      "+79261234567",
      "926 1234567",
      "+33629312213",
    ];
    validItems.forEach((validItem) => expect(constraints.test(validItem)).toBe(true));
  });

  it("Should fail", () => {
    const invalidItems = ["invalid-number", "926 3 4", "8 800 600-APPLE", "XXX XXX XXX 456"];
    invalidItems.forEach((invalidItem) => expect(constraints.test(invalidItem)).toBe(false));
  });
});
