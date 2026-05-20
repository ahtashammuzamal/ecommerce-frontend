import { vi, describe, it, expect, beforeEach } from "vitest";
import { getUserCartApi, addToCartApi, updateCartApi, removeFromCartApi, clearCartApi } from "../../src/api/cart.api";
import { api } from "../../src/api/axios";

vi.mock("../../src/api/axios", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Cart API Callers (src/api/cart.api.ts)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getUserCartApi calls api.get with correct route", async () => {
    const mockResponse = { data: { success: true } };
    (api.get as any).mockResolvedValueOnce(mockResponse);

    const result = await getUserCartApi();

    expect(api.get).toHaveBeenCalledWith("/cart");
    expect(result).toEqual(mockResponse);
  });

  it("addToCartApi calls api.post with correct route and body", async () => {
    const mockResponse = { data: { success: true } };
    (api.post as any).mockResolvedValueOnce(mockResponse);

    const result = await addToCartApi({ productId: 10, quantity: 2 });

    expect(api.post).toHaveBeenCalledWith("/cart/add", { productId: 10, quantity: 2 });
    expect(result).toEqual(mockResponse);
  });

  it("updateCartApi calls api.patch with correct route and body", async () => {
    const mockResponse = { data: { success: true } };
    (api.patch as any).mockResolvedValueOnce(mockResponse);

    const result = await updateCartApi({ id: 1, action: "increment" });

    expect(api.patch).toHaveBeenCalledWith("/cart/update", { id: 1, action: "increment" });
    expect(result).toEqual(mockResponse);
  });

  it("removeFromCartApi calls api.delete with correct ID route", async () => {
    const mockResponse = { data: { success: true } };
    (api.delete as any).mockResolvedValueOnce(mockResponse);

    const result = await removeFromCartApi(5);

    expect(api.delete).toHaveBeenCalledWith("/cart/5");
    expect(result).toEqual(mockResponse);
  });

  it("clearCartApi calls api.post with correct route", async () => {
    const mockResponse = { data: { success: true } };
    (api.post as any).mockResolvedValueOnce(mockResponse);

    const result = await clearCartApi();

    expect(api.post).toHaveBeenCalledWith("/cart/clear");
    expect(result).toEqual(mockResponse);
  });
});
