import { describe, it, expect } from "vitest";
import { checkoutSchema } from "../../../src/schemas/checkoutSchema";

describe("Checkout Schema Validation (src/schemas/checkoutSchema.ts)", () => {
  it("should validate correctly formatted checkout payload", () => {
    const validData = {
      firstName: "Jane",
      lastName: "Doe",
      address: "123 Main Street Road, Apt 4B",
      city: "San Francisco",
      state: "California",
      zipCode: "94103",
      phone: "12345678901",
    };
    const result = checkoutSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject firstName less than 3 characters", () => {
    const data = {
      firstName: "Ja",
      address: "123 Main Street Road, Apt 4B",
      city: "San Francisco",
      state: "California",
      zipCode: "94103",
      phone: "12345678901",
    };
    const result = checkoutSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.firstName?.[0]).toBe("At least 3 characters required");
    }
  });

  it("should reject address less than 10 characters", () => {
    const data = {
      firstName: "Jane",
      address: "Short",
      city: "San Francisco",
      state: "California",
      zipCode: "94103",
      phone: "12345678901",
    };
    const result = checkoutSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.address?.[0]).toBe("At least 10 character");
    }
  });

  it("should enforce zip code regex limitations", () => {
    const baseData = {
      firstName: "Jane",
      address: "123 Main Street Road, Apt 4B",
      city: "San Francisco",
      state: "California",
      phone: "12345678901",
    };

    // Valid zip codes (4 to 6 digits)
    expect(checkoutSchema.safeParse({ ...baseData, zipCode: "1234" }).success).toBe(true);
    expect(checkoutSchema.safeParse({ ...baseData, zipCode: "123456" }).success).toBe(true);

    // Invalid zip codes
    expect(checkoutSchema.safeParse({ ...baseData, zipCode: "123" }).success).toBe(false);
    expect(checkoutSchema.safeParse({ ...baseData, zipCode: "1234567" }).success).toBe(false);
    expect(checkoutSchema.safeParse({ ...baseData, zipCode: "abcde" }).success).toBe(false);
  });

  it("should enforce phone number regex limitations", () => {
    const baseData = {
      firstName: "Jane",
      address: "123 Main Street Road, Apt 4B",
      city: "San Francisco",
      state: "California",
      zipCode: "94103",
    };

    // Valid phone numbers (10 to 15 digits)
    expect(checkoutSchema.safeParse({ ...baseData, phone: "1234567890" }).success).toBe(true);
    expect(checkoutSchema.safeParse({ ...baseData, phone: "123456789012345" }).success).toBe(true);

    // Invalid phone numbers
    expect(checkoutSchema.safeParse({ ...baseData, phone: "123456789" }).success).toBe(false); // 9 digits
    expect(checkoutSchema.safeParse({ ...baseData, phone: "1234567890123456" }).success).toBe(false); // 16 digits
    expect(checkoutSchema.safeParse({ ...baseData, phone: "abc123456789" }).success).toBe(false);
  });
});
