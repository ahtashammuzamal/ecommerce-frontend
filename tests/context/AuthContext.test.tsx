import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../src/context/AuthProvider";
import { useAuthContext } from "../../src/context/AuthContext";
import { getProfileApi, loginApi, logoutApi } from "../../src/api/auth.api";
import { getToken, setToken, removeToken } from "../../src/lib/token";

// Mock the API calls
vi.mock("../../src/api/auth.api", () => ({
  getProfileApi: vi.fn(),
  loginApi: vi.fn(),
  registerApi: vi.fn(),
  logoutApi: vi.fn(),
}));

// Mock Token helper
vi.mock("../../src/lib/token", () => ({
  getToken: vi.fn(),
  setToken: vi.fn(),
  removeToken: vi.fn(),
}));

// Dummy Component to consume and display state for assertions
const TestConsumer = () => {
  const { isAuthenticated, user, loading, login, logout } = useAuthContext();
  
  if (loading) return <div>Auth Loading...</div>;

  return (
    <div>
      <div data-testid="auth-state">{isAuthenticated ? "authenticated" : "guest"}</div>
      <div data-testid="user-name">{user ? user.name : "none"}</div>
      <button onClick={() => login({ email: "test@example.com", password: "password" })}>
        Log In
      </button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

describe("AuthProvider Context (src/context/AuthProvider.tsx)", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient();
  });

  const renderWithProviders = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      </QueryClientProvider>
    );
  };

  it("sets loading false immediately if no token is found on mount", async () => {
    (getToken as any).mockReturnValue(null);

    renderWithProviders();

    // Verify it transitions to guest state
    await waitFor(() => {
      expect(screen.queryByText("Auth Loading...")).not.toBeInTheDocument();
      expect(screen.getByTestId("auth-state")).toHaveTextContent("guest");
    });
    expect(getProfileApi).not.toHaveBeenCalled();
  });

  it("fetches user profile on mount if token is found", async () => {
    (getToken as any).mockReturnValue("mock-token-123");
    (getProfileApi as any).mockResolvedValueOnce({
      data: {
        user: { id: 1, name: "Alice", email: "alice@example.com" },
      },
    });

    renderWithProviders();

    expect(screen.getByText("Auth Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Auth Loading...")).not.toBeInTheDocument();
      expect(screen.getByTestId("auth-state")).toHaveTextContent("authenticated");
      expect(screen.getByTestId("user-name")).toHaveTextContent("Alice");
    });
    expect(getProfileApi).toHaveBeenCalledTimes(1);
  });

  it("updates state on successful login", async () => {
    (getToken as any).mockReturnValue(null);
    (loginApi as any).mockResolvedValueOnce({
      data: {
        token: "session-token",
        user: { id: 2, name: "Bob", email: "bob@example.com" },
      },
    });

    renderWithProviders();

    await waitFor(() => expect(screen.queryByText("Auth Loading...")).not.toBeInTheDocument());

    // Click Login trigger
    await userEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByTestId("auth-state")).toHaveTextContent("authenticated");
      expect(screen.getByTestId("user-name")).toHaveTextContent("Bob");
      expect(setToken).toHaveBeenCalledWith("session-token");
    });
  });

  it("clears state and clears cache on logout", async () => {
    // Start with logged in state
    (getToken as any).mockReturnValue("token-abc");
    (getProfileApi as any).mockResolvedValueOnce({
      data: { user: { id: 3, name: "Charlie" } },
    });
    (logoutApi as any).mockResolvedValueOnce({ data: { success: true } });

    renderWithProviders();

    await waitFor(() => expect(screen.getByTestId("auth-state")).toHaveTextContent("authenticated"));

    const queryClearSpy = vi.spyOn(queryClient, "clear");

    // Click Logout trigger
    await userEvent.click(screen.getByRole("button", { name: /log out/i }));

    await waitFor(() => {
      expect(screen.getByTestId("auth-state")).toHaveTextContent("guest");
      expect(screen.getByTestId("user-name")).toHaveTextContent("none");
      expect(removeToken).toHaveBeenCalledTimes(1);
      expect(queryClearSpy).toHaveBeenCalledTimes(1);
    });
  });
});
