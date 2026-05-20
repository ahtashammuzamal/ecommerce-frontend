import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Input } from "../../src/components/ui/input";

describe("Input UI Component (src/components/ui/input.tsx)", () => {
  it("renders with placeholder and correct attributes", () => {
    render(<Input placeholder="Enter username" type="text" />);
    const inputElement = screen.getByPlaceholderText("Enter username");
    
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("data-slot", "input");
  });

  it("handles user typing correctly", async () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Type here" onChange={handleChange} />);
    const inputElement = screen.getByPlaceholderText("Type here");
    
    await userEvent.type(inputElement, "Hello");
    
    expect(inputElement).toHaveValue("Hello");
    expect(handleChange).toHaveBeenCalledTimes(5); // 5 keystrokes
  });

  it("renders disabled state and is not editable", async () => {
    render(<Input placeholder="Disabled Input" disabled />);
    const inputElement = screen.getByPlaceholderText("Disabled Input");
    
    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveClass("disabled:opacity-50");
    
    await userEvent.type(inputElement, "Hello");
    expect(inputElement).toHaveValue(""); // Typing is ignored on disabled elements
  });

  it("applies aria-invalid styling when invalid", () => {
    render(<Input placeholder="Invalid input" aria-invalid="true" />);
    const inputElement = screen.getByPlaceholderText("Invalid input");
    
    expect(inputElement).toHaveAttribute("aria-invalid", "true");
  });
});
