import { vi, describe, it, expect, beforeEach } from "vitest";
import { createOrderApi, getUserOrdersApi, updateOrderStatus, getAllOrders, cancelUserOrder } from "../../src/api/orders.api";
import { api } from "../../src/api/axios";

vi.mock("../../src/api/axios", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("Orders API Callers (src/api/orders.api.ts)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createOrderApi calls api.post with correct route and address data", async () => {
    const payload = {
      shippingAddress: {
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St",
        city: "Springfield",
        state: "IL",
        zipCode: 62701,
        phone: 5550199,
      },
    };
    const mockResponse = { data: { message: "Order created successfully" } };
    (api.post as any).mockResolvedValueOnce(mockResponse);

    const result = await createOrderApi(payload);

    expect(api.post).toHaveBeenCalledWith("/orders/create", payload);
    expect(result).toEqual(mockResponse);
  });

  it("getUserOrdersApi calls api.get with correct route", async () => {
    const mockResponse = { data: { orders: [] } };
    (api.get as any).mockResolvedValueOnce(mockResponse);

    const result = await getUserOrdersApi();

    expect(api.get).toHaveBeenCalledWith("/orders");
    expect(result).toEqual(mockResponse);
  });

  it("updateOrderStatus calls api.patch with correct route and status", async () => {
    const mockResponse = { data: { message: "Status updated" } };
    (api.patch as any).mockResolvedValueOnce(mockResponse);

    const result = await updateOrderStatus(42, { status: "SHIPPED" as any });

    expect(api.patch).toHaveBeenCalledWith("/orders/42/status", { status: "SHIPPED" });
    expect(result).toEqual(mockResponse);
  });

  it("getAllOrders calls api.get with correct admin route", async () => {
    const mockResponse = { data: { orders: [] } };
    (api.get as any).mockResolvedValueOnce(mockResponse);

    const result = await getAllOrders();

    expect(api.get).toHaveBeenCalledWith("/orders/all");
    expect(result).toEqual(mockResponse);
  });

  it("cancelUserOrder calls api.patch with correct ID route", async () => {
    const mockResponse = { data: { message: "Order cancelled" } };
    (api.patch as any).mockResolvedValueOnce(mockResponse);

    const result = await cancelUserOrder(42);

    expect(api.patch).toHaveBeenCalledWith("/orders/42/cancel");
    expect(result).toEqual(mockResponse);
  });
});
