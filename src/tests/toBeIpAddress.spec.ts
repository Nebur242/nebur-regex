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
        "1::",
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
      ];
      validItems.forEach((validItem) => {
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
    const constraints = iWantRegex()
      .toBeIpAddress({
        withFormat: "both",
      })
      .end();
    it("Should succeed", () => {
      const validItems = [
        "192.168.0.1", // Valid IPv4
        "fe80::1", // Valid IPv6
        "172.16.32.64", // Valid IPv4
        "2001:0db8:85a3:0000:0000:8a2e:0370:7334", // Valid IPv6
      ];
      validItems.forEach((validItem) => {
        expect(constraints.test(validItem)).toBe(true);
      });
    });

    it("Should fail", () => {
      const invalidItems = [
        "256.168.0.1", // Invalid IPv4 (out of range)
        "fe80::1::1", // Invalid IPv6 (double colon)
        "invalid_ip", // Invalid (not a valid IP address)
      ];
      invalidItems.forEach((invalidItem) => {
        expect(constraints.test(invalidItem)).toBe(false);
      });
    });
  });

  describe("IpAddress with CIDR notation", () => {
    describe("IPv4 with CIDR", () => {
      const constraints = iWantRegex()
        .toBeIpAddress({
          withFormat: "v4",
          validateCIDR: true,
        })
        .end();

      it("Should succeed with valid IPv4 CIDR notation", () => {
        const validItems = ["192.168.0.1/24", "10.0.0.0/8", "172.16.0.0/16", "8.8.8.8/32", "0.0.0.0/0"];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should succeed with valid IPv4 without CIDR", () => {
        const validItems = ["192.168.0.1", "10.0.0.1", "172.16.0.1", "8.8.8.8"];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should fail with invalid CIDR notation", () => {
        const invalidItems = [
          "192.168.0.1/33", // Invalid prefix (max is 32)
          "10.0.0.0/-1", // Invalid negative prefix
          "172.16.0.0/999", // Invalid large prefix
          "8.8.8.8/a", // Non-numeric prefix
        ];
        invalidItems.forEach((invalidItem) => {
          expect(constraints.test(invalidItem)).toBe(false);
        });
      });
    });

    describe("IPv6 with CIDR", () => {
      const constraints = iWantRegex()
        .toBeIpAddress({
          withFormat: "v6",
          validateCIDR: true,
        })
        .end();

      it("Should succeed with valid IPv6 CIDR notation", () => {
        const validItems = ["2001:db8::/32", "fe80::/64", "::1/128", "fc00::/7", "::/0"];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should fail with invalid CIDR notation", () => {
        const invalidItems = [
          "2001:db8::/129", // Invalid prefix (max is 128)
          "fe80::/-1", // Invalid negative prefix
          "::1/256", // Invalid large prefix
          "fc00::/x", // Non-numeric prefix
        ];
        invalidItems.forEach((invalidItem) => {
          expect(constraints.test(invalidItem)).toBe(false);
        });
      });
    });

    describe("Both IPv4 and IPv6 with CIDR", () => {
      const constraints = iWantRegex()
        .toBeIpAddress({
          withFormat: "both",
          validateCIDR: true,
        })
        .end();

      it("Should succeed with valid IP CIDR notation", () => {
        const validItems = [
          "192.168.0.1/24", // IPv4
          "2001:db8::/32", // IPv6
          "10.0.0.0/8", // IPv4
          "fe80::/64", // IPv6
          "::1/128", // IPv6
          "0.0.0.0/0", // IPv4
        ];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });
    });
  });

  describe("IpAddress type validation", () => {
    describe("Private IP addresses", () => {
      const constraints = iWantRegex()
        .toBeIpAddress({
          withFormat: "v4",
          validateType: ["private"],
        })
        .end();

      it("Should succeed with private IPv4 addresses", () => {
        const validItems = ["192.168.0.1", "10.0.0.1", "172.16.0.1", "172.31.255.255", "192.168.255.255"];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should fail with public IPv4 addresses", () => {
        const invalidItems = ["8.8.8.8", "1.1.1.1", "203.0.113.1", "104.16.132.229"];
        invalidItems.forEach((invalidItem) => {
          expect(constraints.test(invalidItem)).toBe(false);
        });
      });
    });

    describe("Public IP addresses", () => {
      const constraints = iWantRegex()
        .toBeIpAddress({
          withFormat: "v4",
          validateType: ["public"],
        })
        .end();

      it("Should succeed with public IPv4 addresses", () => {
        const validItems = ["8.8.8.8", "1.1.1.1", "203.0.113.1", "104.16.132.229"];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should fail with non-public IPv4 addresses", () => {
        const invalidItems = [
          "192.168.0.1", // Private
          "10.0.0.1", // Private
          "172.16.0.1", // Private
          "127.0.0.1", // Loopback
          "169.254.1.1", // Link-local
        ];
        invalidItems.forEach((invalidItem) => {
          expect(constraints.test(invalidItem)).toBe(false);
        });
      });
    });

    describe("Loopback IP addresses", () => {
      const constraints = iWantRegex()
        .toBeIpAddress({
          withFormat: "both",
          validateType: ["loopback"],
        })
        .end();

      it("Should succeed with loopback addresses", () => {
        const validItems = [
          "127.0.0.1", // IPv4 loopback
          "127.0.1.1", // Also IPv4 loopback
          "::1", // IPv6 loopback
        ];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should fail with non-loopback addresses", () => {
        const invalidItems = [
          "192.168.0.1", // Private
          "8.8.8.8", // Public
          "fe80::1", // Link-local IPv6
        ];
        invalidItems.forEach((invalidItem) => {
          expect(constraints.test(invalidItem)).toBe(false);
        });
      });
    });

    describe("Multiple IP address types", () => {
      const constraints = iWantRegex()
        .toBeIpAddress({
          withFormat: "both",
          validateType: ["private", "loopback"],
        })
        .end();

      it("Should succeed with private or loopback addresses", () => {
        const validItems = [
          "192.168.0.1", // Private
          "10.0.0.1", // Private
          "172.16.0.1", // Private
          "127.0.0.1", // Loopback
          "::1", // IPv6 loopback
        ];
        validItems.forEach((validItem) => {
          expect(constraints.test(validItem)).toBe(true);
        });
      });

      it("Should fail with addresses that are neither private nor loopback", () => {
        const invalidItems = [
          "8.8.8.8", // Public
          "1.1.1.1", // Public
          "2001:4860:4860::8888", // Public IPv6
        ];
        invalidItems.forEach((invalidItem) => {
          expect(constraints.test(invalidItem)).toBe(false);
        });
      });
    });
  });
});
