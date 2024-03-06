import { iWantRegex } from "..";
import { describe, expect, it } from "@jest/globals";

describe("Password Validator", () => {
  const constraints = iWantRegex().toCheckPassword().end();

  it("Should succeed", () => {
    const validItems = [
      "Abcd12",
      'Pass@123!()"#~ç^',
      "StrongPwd!23",
      "Passw0rd!",
      "StrongP@ss1",
      "Abc123!",
      "S3cr#t",
      "Pa$$w0rD",
    ];
    validItems.forEach((validItem) => {
      expect(constraints.test(validItem)).toBe(true);
    });
  });

  it("Should fail", () => {
    const invalidItems = [
      "Short",
      "123456",
      "short!",
      "nocapsornumbers",
      "onlylowercase123",
      "ONLYUPPERCASE!",
      "Spec!alChar",
      "spacesNotAllowed",
      "!@#$%^Pn",
      "123456",
    ];
    invalidItems.forEach((invalidItem) => {
      expect(constraints.test(invalidItem)).toBe(false);
    });
  });
});
