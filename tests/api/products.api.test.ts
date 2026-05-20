import { vi, describe, it, expect, beforeEach } from "vitest";
import { getAllProductsApi, getSingleProductApi, createProductApi, updateProductApi, deleteProductApi } from "../../src/api/products.api";
import { api } from "../../src/api/axios";

vi.mock("../../src/api/axios", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Products API Callers (src/api/products.api.ts)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAllProductsApi calls api.get with clean query parameters", async () => {
    const filters = { search: "mug", page: 1, limit: 6, maxPrice: undefined };
    const mockResponse = { data: { products: [] } };
    (api.get as any).mockResolvedValueOnce(mockResponse);

    const result = await getAllProductsApi(filters);

    expect(api.get).toHaveBeenCalledWith("/products", {
      params: { search: "mug", page: 1, limit: 6 }, // maxPrice is cleaned out because it's undefined
    });
    expect(result).toEqual(mockResponse);
  });

  it("getSingleProductApi calls api.get with correct ID route", async () => {
    const mockResponse = { data: { product: {} } };
    (api.get as any).mockResolvedValueOnce(mockResponse);

    const result = await getSingleProductApi(42);

    expect(api.get).toHaveBeenCalledWith("/products/42");
    expect(result).toEqual(mockResponse);
  });

  it("createProductApi calls api.post with FormData payload", async () => {
    const mockData = new FormData();
    mockData.append("title", "Test Product");
    const mockResponse = { data: { success: true } };
    (api.post as any).mockResolvedValueOnce(mockResponse);

    const result = await createProductApi(mockData);

    expect(api.post).toHaveBeenCalledWith("/products/create", mockData);
    expect(result).toEqual(mockResponse);
  });

  it("updateProductApi calls api.patch with correct route and data", async () => {
    const mockData = new FormData();
    const mockResponse = { data: { success: true } };
    (api.patch as any).mockResolvedValueOnce(mockResponse);

    const result = await updateProductApi(99, mockData);

    expect(api.patch).toHaveBeenCalledWith("/products/99", mockData);
    expect(result).toEqual(mockResponse);
  });

  it("deleteProductApi calls api.delete with correct route", async () => {
    const mockResponse = { data: { success: true } };
    (api.delete as any).mockResolvedValueOnce(mockResponse);

    const result = await deleteProductApi(99);

    expect(api.delete).toHaveBeenCalledWith("/products/99");
    expect(result).toEqual(mockResponse);
  });
});
