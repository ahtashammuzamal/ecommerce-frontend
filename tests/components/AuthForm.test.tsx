import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AuthForm from "../../src/components/auth/AuthForm";
import { useAuthContext } from "../../src/context/AuthContext";
import { toast } from "sonner";

// Mock hooks and services
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../src/context/AuthContext", () => ({
  useAuthContext: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("AuthForm Component (src/components/auth/AuthForm.tsx)", () => {
  const mockLogin = vi.fn();
  const mockRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuthContext as any).mockReturnValue({
      login: mockLogin,
      register: mockRegister,
    });
  });

  it("renders Login view fields correctly", () => {
    render(
      <MemoryRouter>
        <AuthForm authType="login" />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
  });

  it("renders Register view fields correctly", () => {
    render(
      <MemoryRouter>
        <AuthForm authType="register" />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /create an account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("triggers validations and shows errors for invalid login data", async () => {
    render(
      <MemoryRouter>
        <AuthForm authType="login" />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitBtn);

    // Schema demands valid email and password >= 6 characters
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Min 6 characters")).toBeInTheDocument();
    });
  });

  it("triggers successful login submission, redirects and alerts toast", async () => {
    mockLogin.mockResolvedValueOnce({ message: "Logged in successfully!" });
    
    render(
      <MemoryRouter>
        <AuthForm authType="login" />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        name: "",
        email: "user@example.com",
        password: "password123",
      });
      expect(toast.success).toHaveBeenCalledWith("Logged in successfully!");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("triggers successful registration submission and redirects", async () => {
    mockRegister.mockResolvedValueOnce({ message: "Registered successfully!" });
    
    render(
      <MemoryRouter>
        <AuthForm authType="register" />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/name/i), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/email/i), "jane@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
      });
      expect(toast.success).toHaveBeenCalledWith("Registered successfully!");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("handles server/submission error and displays toast error", async () => {
    const mockError = {
      response: {
        data: {
          message: "Invalid credentials",
        },
      },
    };
    mockLogin.mockRejectedValueOnce(mockError);

    render(
      <MemoryRouter>
        <AuthForm authType="login" />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
