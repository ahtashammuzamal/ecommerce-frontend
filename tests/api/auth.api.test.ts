import { vi, describe, it, expect, beforeEach } from "vitest";
import { registerApi, loginApi, getProfileApi, logoutApi, changeUserPassword } from "../../src/api/auth.api";
import { api } from "../../src/api/axios";

vi.mock("../../src/api/axios", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("Auth API Callers (src/api/auth.api.ts)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registerApi calls api.post with correct route and data", async () => {
    const payload = { name: "John", email: "john@example.com", password: "password123" };
    const mockResponse = { data: { success: true } };
    (api.post as any).mockResolvedValueOnce(mockResponse);

    const result = await registerApi(payload);

    expect(api.post).toHaveBeenCalledWith("/auth/register", payload);
    expect(result).toEqual(mockResponse);
  });

  it("loginApi calls api.post with correct route and data", async () => {
    const payload = { name: "", email: "john@example.com", password: "password123" };
    const mockResponse = { data: { token: "abc" } };
    (api.post as any).mockResolvedValueOnce(mockResponse);

    const result = await loginApi(payload);

    expect(api.post).toHaveBeenCalledWith("/auth/login", payload);
    expect(result).toEqual(mockResponse);
  });

  it("getProfileApi calls api.get with correct route", async () => {
    const mockResponse = { data: { user: { name: "John" } } };
    (api.get as any).mockResolvedValueOnce(mockResponse);

    const result = await getProfileApi();

    expect(api.get).toHaveBeenCalledWith("/auth/my-profile");
    expect(result).toEqual(mockResponse);
  });

  it("logoutApi calls api.post with correct route", async () => {
    const mockResponse = { data: { success: true } };
    (api.post as any).mockResolvedValueOnce(mockResponse);

    const result = await logoutApi();

    expect(api.post).toHaveBeenCalledWith("/auth/logout");
    expect(result).toEqual(mockResponse);
  });

  it("changeUserPassword calls api.post with correct route and body", async () => {
    const payload = { currentPassword: "old", newPassword: "new" };
    const mockResponse = { data: { success: true } };
    (api.post as any).mockResolvedValueOnce(mockResponse);

    const result = await changeUserPassword(payload);

    expect(api.post).toHaveBeenCalledWith("/auth/change-password", payload);
    expect(result).toEqual(mockResponse);
  });
});
