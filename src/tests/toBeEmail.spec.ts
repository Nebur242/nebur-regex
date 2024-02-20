import * as MRHGenerator from "..";
import { describe, expect, it } from "@jest/globals";

describe("Email Validator", () => {
  const constraints = MRHGenerator.iWantRegex().toBeEmail().end();

  it("Should succeed", () => {
    const validEmails = [
      "user@example.com",
      "john.doe123@domain.co",
      "alice+smith@email.net",
      "info@company.org",
      "support@my-website.com",
    ];
    validEmails.forEach((email) => {
      expect(constraints.test(email)).toBe(true);
    });
  });

  it("Should fail", () => {
    const invalidEmails = [
      "invalid-email",
      "missing@dotcom",
      "@missing-username.com",
      "user@missing-tld",
      "space in@email.com",
      "double..dots@example.com",
      "user@inva!lid-characters.com",
    ];
    invalidEmails.forEach((email) => {
      expect(constraints.test(email)).toBe(false);
    });
  });
});
