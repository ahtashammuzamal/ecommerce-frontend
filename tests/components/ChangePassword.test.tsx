import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ChangePassword from "../../src/components/account/ChangePassword";
import { changeUserPassword } from "../../src/api/auth.api";
import { toast } from "sonner";

// Mock the API and toast notifications
vi.mock("../../src/api/auth.api", () => ({
  changeUserPassword: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("ChangePassword Component (src/components/account/ChangePassword.tsx)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Change Password form elements correctly", () => {
    render(<ChangePassword />);
    
    expect(screen.getByText("Change password")).toBeInTheDocument();
    expect(screen.getByLabelText("Current Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("New Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm New Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update password/i })).toBeInTheDocument();
  });

  it("shows validations errors if fields are empty or short", async () => {
    render(<ChangePassword />);
    
    const submitBtn = screen.getByRole("button", { name: /update password/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Min 6 characters")).toBeInTheDocument();
      // Since newPassword and confirmNewPassword both require min 6 chars, RTL should find them
      expect(screen.getAllByText("Min 6 character")).toHaveLength(2);
    });
  });

  it("shows validation error if new password does not match confirm new password", async () => {
    render(<ChangePassword />);

    await userEvent.type(screen.getByLabelText("Current Password:"), "oldPassword123");
    await userEvent.type(screen.getByLabelText("New Password:"), "newPassword123");
    await userEvent.type(screen.getByLabelText("Confirm New Password:"), "differentPass1");
    await userEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(screen.getByText("Password does not match")).toBeInTheDocument();
    });
  });

  it("shows validation error if new password is same as current password", async () => {
    render(<ChangePassword />);

    await userEvent.type(screen.getByLabelText("Current Password:"), "password123");
    await userEvent.type(screen.getByLabelText("New Password:"), "password123");
    await userEvent.type(screen.getByLabelText("Confirm New Password:"), "password123");
    await userEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(screen.getByText("New password must be different from current password")).toBeInTheDocument();
    });
  });

  it("submits the form successfully and resets the input fields", async () => {
    const mockChangeUserPassword = changeUserPassword as any;
    mockChangeUserPassword.mockResolvedValueOnce({ data: { message: "Success" } });

    render(<ChangePassword />);

    const currentInput = screen.getByLabelText("Current Password:");
    const newInput = screen.getByLabelText("New Password:");
    const confirmInput = screen.getByLabelText("Confirm New Password:");

    await userEvent.type(currentInput, "oldPassword123");
    await userEvent.type(newInput, "newPassword123");
    await userEvent.type(confirmInput, "newPassword123");
    await userEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(mockChangeUserPassword).toHaveBeenCalledWith({
        currentPassword: "oldPassword123",
        newPassword: "newPassword123",
      });
      expect(toast.success).toHaveBeenCalledWith("Password changed successfully");
      
      // Fields must be reset on success
      expect(currentInput).toHaveValue("");
      expect(newInput).toHaveValue("");
      expect(confirmInput).toHaveValue("");
    });
  });

  it("handles password update api errors correctly", async () => {
    const mockChangeUserPassword = changeUserPassword as any;
    mockChangeUserPassword.mockRejectedValueOnce(new Error("API Error"));

    render(<ChangePassword />);

    await userEvent.type(screen.getByLabelText("Current Password:"), "oldPassword123");
    await userEvent.type(screen.getByLabelText("New Password:"), "newPassword123");
    await userEvent.type(screen.getByLabelText("Confirm New Password:"), "newPassword123");
    await userEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error updating user password");
    });
  });
});
