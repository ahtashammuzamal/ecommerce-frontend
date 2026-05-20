import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCart } from "../../src/hooks/tanstack/cart/useCart";
import { getUserCartApi } from "../../src/api/cart.api";
import { useAuthContext } from "../../src/context/AuthContext";

// Mock dependencies
vi.mock("../../src/api/cart.api", () => ({
  getUserCartApi: vi.fn(),
}));

vi.mock("../../src/context/AuthContext", () => ({
  useAuthContext: vi.fn(),
}));

describe("useCart Query Hook (src/hooks/tanstack/cart/useCart.tsx)", () => {
  let queryClient: QueryClient;
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup fresh QueryClient for isolation between tests
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Prevents tests from timing out on failures
        },
      },
    });

    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });

  it("should not run query when isAuthenticated is false", () => {
    (useAuthContext as any).mockReturnValue({ isAuthenticated: false });

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.isEnabled).toBeFalsy(); // Query enabled state is false
    expect(getUserCartApi).not.toHaveBeenCalled();
  });

  it("should successfully fetch cart data when authenticated", async () => {
    (useAuthContext as any).mockReturnValue({ isAuthenticated: true });
    
    const mockCartResponse = {
      data: {
        success: true,
        totalCartItems: 2,
        cart: {
          id: 1,
          cartItems: [
            {
              id: 10,
              quantity: 2,
              product: { id: 101, title: "Coffee Mug", price: 15 },
            },
          ],
        },
      },
    };
    (getUserCartApi as any).mockResolvedValueOnce(mockCartResponse);

    const { result } = renderHook(() => useCart(), { wrapper });

    // Wait until query fetches successfully
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getUserCartApi).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockCartResponse.data);
  });
});
