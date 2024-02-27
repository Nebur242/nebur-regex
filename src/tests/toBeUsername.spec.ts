import { iWantRegex } from "..";
import { describe, expect, it } from "@jest/globals";

describe("Lowercase Validator", () => {
  const constraints = iWantRegex().toBeUsername().end();

  it("Should succeed", () => {
    const validItems = ["abc123", "UserName-1", "123-abc", "my_name", "AbC_456"];
    validItems.forEach((validItem) => {
      expect(constraints.test(validItem)).toBe(true);
    });
  });

  it("Should fail", () => {
    const invalidItems = ["ab", "12345678901234567", "user@name", "space  space", "special@character!"];
    invalidItems.forEach((invalidItem) => {
      expect(constraints.test(invalidItem)).toBe(false);
    });
  });
});
