import * as MRHGenerator from "..";
import { describe, expect, it } from "@jest/globals";

describe("Credit Card Numbers Validator", () => {
  const constraints = MRHGenerator.iWantRegex().toBeCreditCardNumber().end();

  it("Should succeed", () => {
    const validItems = [
      //VISA
      "4716.7617.8866.2363",
      "4485-5302-7399-3123",
      "4916 8046 1708 9891",
      "4916979857133987",
      "4316708149478330",
      //MASTER
      "5467.5241.4453.3217",
      "5576-0345-4114-0747",
      "5177 0837 8357 2821",
      "5427965305098004",
      "5269515836312159",
    ];
    validItems.forEach((validItem) => {
      if (!constraints.test(validItem)) console.log(validItem);
      expect(constraints.test(validItem)).toBe(true);
    });
  });

  it("Should fail", () => {
    const invalidItems = ["invalid-card-number", "411111111111", "411111111111111122233333", "abc1234567890123"];
    invalidItems.forEach((invalidItem) => {
      if (constraints.test(invalidItem)) console.log(invalidItem);
      expect(constraints.test(invalidItem)).toBe(false);
    });
  });
});
