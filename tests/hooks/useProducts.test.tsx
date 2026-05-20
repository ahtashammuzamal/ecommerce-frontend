import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useProducts from "../../src/hooks/tanstack/products/useProducts";
import { getAllProductsApi } from "../../src/api/products.api";
import { toast } from "sonner";

// Mock dependent APIs and libs
vi.mock("../../src/api/products.api", () => ({
  getAllProductsApi: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("useProducts Query Hook (src/hooks/tanstack/products/useProducts.tsx)", () => {
  let queryClient: QueryClient;
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    vi.clearAllMocks();

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });

  it("should load products successfully", async () => {
    const mockFilters = { page: 1, limit: 6 };
    const mockProductsResponse = {
      data: {
        products: [{ id: 1, title: "Test Product", price: 10 }],
        meta: { total: 1, page: 1, limit: 6, totalPages: 1 },
      },
    };
    (getAllProductsApi as any).mockResolvedValueOnce(mockProductsResponse);

    const { result } = renderHook(() => useProducts({ filters: mockFilters }), { wrapper });

    expect(result.current.isPending).toBe(true);

    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(getAllProductsApi).toHaveBeenCalledWith(mockFilters);
    expect(result.current.data).toEqual(mockProductsResponse.data);
    expect(result.current.isError).toBe(false);
  });

  it("should trigger error toast alert when loading fails", async () => {
    (getAllProductsApi as any).mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() => useProducts({ filters: { page: 1 } }), { wrapper });

    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(result.current.isError).toBe(true);
    expect(toast.error).toHaveBeenCalledWith("Error loading products");
  });
});
