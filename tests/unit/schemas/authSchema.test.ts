import { describe, it, expect } from "vitest";
import { registerSchema, loginSchema } from "../../../src/schemas/authSchema";

describe("Auth Schemas Validation (src/schemas/authSchema.ts)", () => {
  describe("registerSchema", () => {
    it("should accept valid registration inputs", () => {
      const data = {
        name: "Alice",
        email: "alice@example.com",
        password: "securePassword1",
      };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject names less than 3 characters", () => {
      const data = {
        name: "Ab",
        email: "alice@example.com",
        password: "securePassword1",
      };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        expect(fieldErrors.name?.[0]).toBe("Name should be of atleast 3 characters");
      }
    });

    it("should trim name white spaces on transform", () => {
      const data = {
        name: "   Alice Smith   ",
        email: "alice@example.com",
        password: "securePassword1",
      };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("Alice Smith");
      }
    });

    it("should reject invalid email format", () => {
      const data = {
        name: "Alice",
        email: "not-an-email",
        password: "securePassword1",
      };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        expect(fieldErrors.email?.[0]).toBe("Email is required");
      }
    });

    it("should reject password less than 6 characters", () => {
      const data = {
        name: "Alice",
        email: "alice@example.com",
        password: "abc",
      };
      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        expect(fieldErrors.password?.[0]).toBe("Min 6 characters");
      }
    });
  });

  describe("loginSchema", () => {
    it("should accept valid login inputs", () => {
      const data = {
        email: "alice@example.com",
        password: "password123",
      };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should allow name to be optional or omitted", () => {
      const data = {
        name: "Alice",
        email: "alice@example.com",
        password: "password123",
      };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email format", () => {
      const data = {
        email: "alice-at-example.com",
        password: "password123",
      };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject password shorter than 6 characters", () => {
      const data = {
        email: "alice@example.com",
        password: "12345",
      };
      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
