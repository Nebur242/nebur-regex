import { iWantRegex } from "..";
import { describe, expect, it } from "@jest/globals";

describe("IpAdress Validator", () => {
  describe("Default IpAddress v4 and v6", () => {
    const constraints = iWantRegex().toBeIpAddress().end();
    it("Should succeed", () => {
      const validItems = [
        "192.168.0.1", // Valid IPv4
        "fe80::1", // Valid IPv6
        "172.16.32.64", // Valid IPv4
        "2001:0db8:85a3:0000:0000:8a2e:0370:7334", // Valid IPv6
        "8.8.8.8", // Valid IPv4
        "fd00::1", // Valid IPv6
        "127.0.0.1", // Valid IPv4
        "::1", // Valid IPv6
        "255.255.255.0", // Valid IPv4
        "2001:0db8::1",
      ];
      validItems.forEach((validItem) => {
        if (!constraints.test(validItem)) {
          console.log(validItem);
        }
        expect(constraints.test(validItem)).toBe(true);
      });
    });

    it("Should fail", () => {
      const invalidItems = [
        "256.168.0.1", // Invalid IPv4 (out of range)
        "fe80::1::1", // Invalid IPv6 (double colon)
        "172.16.32.264", // Invalid IPv4 (out of range)
        "invalid_ip", // Invalid (not a valid IP address)
        "2001:0db8:::1", // Invalid IPv6 (double colon)
        "localhost", // Invalid (not a valid IP address)
      ];
      invalidItems.forEach((invalidItem) => {
        expect(constraints.test(invalidItem)).toBe(false);
      });
    });
  });

  describe("IpAddress with v4 format", () => {
    const constraints = iWantRegex()
      .toBeIpAddress({
        withFormat: "v4",
      })
      .end();
    it("Should succeed", () => {
      const validItems = ["192.168.0.1", "10.0.0.255", "172.16.32.64", "8.8.8.8", "127.0.0.1", "255.255.255.0"];
      validItems.forEach((validItem) => {
        if (!constraints.test(validItem)) {
          console.log(validItem);
        }
        expect(constraints.test(validItem)).toBe(true);
      });
    });

    it("Should fail", () => {
      const invalidItems = [
        "256.168.0.1", // Invalid IPv4 (out of range)
        "172.16.32.264", // Invalid IPv4 (out of range)
        "invalid_ip", // Invalid (not a valid IP address)
        "2001:0db8:::1", // Invalid IPv6 (double colon)
        "localhost", // Invalid (not a valid IP address)
      ];
      invalidItems.forEach((invalidItem) => {
        expect(constraints.test(invalidItem)).toBe(false);
      });
    });
  });

  describe("IpAddress with v6 format", () => {
    const constraints = iWantRegex()
      .toBeIpAddress({
        withFormat: "v6",
      })
      .end();
    it("Should succeed", () => {
      const validItems = [
        "::",
        "1::",
        "::1",
        "1::8",
        "1::7:8",
        "1:2:3:4:5:6:7:8",
        "1:2:3:4:5:6::8",
        "1:2:3:4:5:6:7::",
        "1:2:3:4:5::7:8",
        "1:2:3:4:5::8",
        "1:2:3::8",
        "1::4:5:6:7:8",
        "1::6:7:8",
        "1::3:4:5:6:7:8",
        "1:2:3:4::6:7:8",
        "1:2::4:5:6:7:8",
        "::2:3:4:5:6:7:8",
        "1:2::8",
        "2001:0000:1234:0000:0000:C1C0:ABCD:0876",
        "3ffe:0b00:0000:0000:0001:0000:0000:000a",
        "FF02:0000:0000:0000:0000:0000:0000:0001",
        "0000:0000:0000:0000:0000:0000:0000:0001",
        "0000:0000:0000:0000:0000:0000:0000:0000",
      ];
      validItems.forEach((validItem) => {
        if (!constraints.test(validItem)) {
          console.log(validItem);
        }
        expect(constraints.test(validItem)).toBe(true);
      });
    });

    it("Should fail", () => {
      const invalidItems = [
        "256.168.0.1", // Invalid IPv4 (out of range)
        "172.16.32.264", // Invalid IPv4 (out of range)
        "fe80::1::1", // Invalid IPv6 (double colon)
        "invalid_ip", // Invalid (not a valid IP address)
        "2001:0db8:::1", // Invalid IPv6 (double colon)
        "localhost", // Invalid (not a valid IP address)
      ];
      invalidItems.forEach((invalidItem) => {
        expect(constraints.test(invalidItem)).toBe(false);
      });
    });
  });

  describe("IpAddress with both format", () => {
    const constraints = iWantRegex().toBeIpAddress({ withFormat: "both" }).end();
    it("Should succeed", () => {
      const validItems = [
        "192.168.0.1", // Valid IPv4
        "fe80::1", // Valid IPv6
        "172.16.32.64", // Valid IPv4
        "2001:0db8:85a3:0000:0000:8a2e:0370:7334", // Valid IPv6
        "8.8.8.8", // Valid IPv4
        "fd00::1", // Valid IPv6
        "127.0.0.1", // Valid IPv4
        "::1", // Valid IPv6
        "255.255.255.0", // Valid IPv4
        "2001:0db8::1",
      ];
      validItems.forEach((validItem) => {
        if (!constraints.test(validItem)) {
          console.log(validItem);
        }
        expect(constraints.test(validItem)).toBe(true);
      });
    });

    it("Should fail", () => {
      const invalidItems = [
        "256.168.0.1", // Invalid IPv4 (out of range)
        "fe80::1::1", // Invalid IPv6 (double colon)
        "172.16.32.264", // Invalid IPv4 (out of range)
        "invalid_ip", // Invalid (not a valid IP address)
        "2001:0db8:::1", // Invalid IPv6 (double colon)
        "localhost", // Invalid (not a valid IP address)
      ];
      invalidItems.forEach((invalidItem) => {
        expect(constraints.test(invalidItem)).toBe(false);
      });
    });
  });
});
