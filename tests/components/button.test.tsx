import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../../src/components/ui/button";

describe("Button UI Component (src/components/ui/button.tsx)", () => {
  it("renders correctly with default styles and text content", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("data-variant", "default");
    expect(buttonElement).toHaveAttribute("data-size", "default");
  });

  it("applies the custom variants classes correctly", () => {
    render(<Button variant="destructive">Delete Item</Button>);
    const buttonElement = screen.getByRole("button", { name: /delete item/i });
    expect(buttonElement).toHaveAttribute("data-variant", "destructive");
    expect(buttonElement).toHaveClass("bg-destructive");
  });

  it("applies custom size configurations correctly", () => {
    render(<Button size="sm">Small Action</Button>);
    const buttonElement = screen.getByRole("button", { name: /small action/i });
    expect(buttonElement).toHaveAttribute("data-size", "sm");
    expect(buttonElement).toHaveClass("h-8");
  });

  it("triggers click callback correctly", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const buttonElement = screen.getByRole("button", { name: /click/i });
    
    await userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("cannot be clicked and looks faded when disabled", async () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Submit</Button>);
    const buttonElement = screen.getByRole("button", { name: /submit/i });
    
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("disabled:opacity-50");
    
    await userEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
