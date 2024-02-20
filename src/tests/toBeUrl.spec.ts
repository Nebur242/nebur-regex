import * as MRHGenerator from "..";
import { describe, expect, it } from "@jest/globals";

describe("Url Validator", () => {
  const constraints = MRHGenerator.iWantRegex().toBeURL().end();

  it("Should succeed", () => {
    const validItems = [
      "https://www.example.com",
      "http://subdomain.example.co/path/to/page",
      "www.demo.com",
      "http://foo.co.uk/",
      "http://regexr.com/foo.html?q=bar",
      "https://mediatemple.net",
      "https://ports.work.too:1337",
      "http://127.0.0.1",
      "http://127.0.0.1/something",
      "http://127.0.0.1/something-else",
      "http://127.0.0.1/something/else#anchored",
      "http://127.0.0.1/something/else?and=more&even=more",
    ];
    validItems.forEach((validItem) => {
      expect(constraints.test(validItem)).toBe(true);
    });
  });

  it("Should fail", () => {
    const invalidItems = ["www.invalid-url", "invalid-url", "http://invalid domain.com", "ftp://ftp.example.org"];
    invalidItems.forEach((invalidItem) => {
      expect(constraints.test(invalidItem)).toBe(false);
    });
  });
});
