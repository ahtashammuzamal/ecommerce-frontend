import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "../../src/Pages/Products";
import { getAllProductsApi } from "../../src/api/products.api";
import { getCategoriesApi } from "../../src/api/categories.api";

// Mock the API calls
vi.mock("../../src/api/products.api", () => ({
  getAllProductsApi: vi.fn(),
}));

vi.mock("../../src/api/categories.api", () => ({
  getCategoriesApi: vi.fn(),
}));

// Mock dependent auth / cart context for button interactions
vi.mock("../../src/context/AuthContext", () => ({
  useAuthContext: () => ({
    isAuthenticated: true,
  }),
}));

vi.mock("../../src/hooks/tanstack/cart/useAddToCart", () => ({
  useAddToCart: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

describe("Products Page Integration (src/Pages/Products.tsx)", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    // Mock category listing API
    (getCategoriesApi as any).mockResolvedValue({
      data: { categories: [{ id: 1, name: "Fashion", slug: "fashion" }] },
    });
  });

  const renderProductsPage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it("renders page header and list of products successfully", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Denim Jeans",
        price: 49,
        images: ["https://example.com/jeans.jpg"],
        category: { name: "Fashion" },
        stock: 10,
        description: "Jeans",
      },
      {
        id: 2,
        title: "T-Shirt",
        price: 19,
        images: ["https://example.com/tshirt.jpg"],
        category: { name: "Fashion" },
        stock: 5,
        description: "Comfy Tee",
      },
    ];

    (getAllProductsApi as any).mockResolvedValue({
      data: {
        products: mockProducts,
        meta: { total: 2, page: 1, limit: 6, totalPages: 1 },
      },
    });

    renderProductsPage();

    // Verify loading state is shown initially or transitions out
    await waitFor(() => {
      expect(screen.getByText("Shop All")).toBeInTheDocument();
      // Description displays: `${totalProducts} Products`
      expect(screen.getByText("2 Products")).toBeInTheDocument();
      expect(screen.getByText("Denim Jeans")).toBeInTheDocument();
      expect(screen.getByText("T-Shirt")).toBeInTheDocument();
    });
  });

  it("handles pagination updates correctly", async () => {
    // Page 1 yields 8 products total (limit 6 per page)
    (getAllProductsApi as any).mockResolvedValue({
      data: {
        products: Array.from({ length: 6 }, (_, i) => ({
          id: i + 1,
          title: `Product ${i + 1}`,
          price: 10 + i,
          images: [],
          category: { name: "Fashion" },
          stock: 10,
        })),
        meta: { total: 8, page: 1, limit: 6, totalPages: 2 },
      },
    });

    renderProductsPage();

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    // Mock response for Page 2
    (getAllProductsApi as any).mockResolvedValue({
      data: {
        products: Array.from({ length: 2 }, (_, i) => ({
          id: i + 7,
          title: `Product ${i + 7}`,
          price: 20 + i,
          images: [],
          category: { name: "Fashion" },
          stock: 10,
        })),
        meta: { total: 8, page: 2, limit: 6, totalPages: 2 },
      },
    });

    const nextBtn = screen.getByRole("button", { name: /next/i });
    await userEvent.click(nextBtn);

    await waitFor(() => {
      expect(screen.getByText("Product 7")).toBeInTheDocument();
      expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    });
  });
});
