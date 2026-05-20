import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, type Mock } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../src/components/common/ProtectedRoute";
import { useAuthContext } from "../../src/context/AuthContext";

// Mock the AuthContext
vi.mock("../../src/context/AuthContext", () => ({
  useAuthContext: vi.fn(),
}));

describe("ProtectedRoute Component (src/components/common/ProtectedRoute.tsx)", () => {
  it("renders loading spinner state when auth state is loading", () => {
    (useAuthContext as Mock).mockReturnValue({
      isAuthenticated: false,
      loading: true,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Area</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Checks that the spinner is displayed
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(screen.queryByText("Protected Area")).not.toBeInTheDocument();
  });

  it("redirects to login if user is not authenticated", () => {
    (useAuthContext as Mock).mockReturnValue({
      isAuthenticated: false,
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={["/protected-route"]}>
        <Routes>
          <Route
            path="/protected-route"
            element={
              <ProtectedRoute>
                <div>Protected Area</div>
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<div>Mock Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Area")).not.toBeInTheDocument();
    expect(screen.getByText("Mock Login Page")).toBeInTheDocument();
  });

  it("renders protected child elements if authenticated", () => {
    (useAuthContext as Mock).mockReturnValue({
      isAuthenticated: true,
      loading: false,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Area</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Area")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
