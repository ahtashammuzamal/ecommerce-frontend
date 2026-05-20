import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StockDisplayer from "../../src/components/common/StockDisplayer";

describe("StockDisplayer Component (src/components/common/StockDisplayer.tsx)", () => {
  it("renders 'In Stock' with green dot when stock is greater than 0", () => {
    const { container } = render(<StockDisplayer stock={5} />);
    
    expect(screen.getByText("In Stock")).toBeInTheDocument();
    
    // Check that it contains a green dot indicator
    const indicatorDot = container.querySelector(".rounded-full");
    expect(indicatorDot).toBeInTheDocument();
    expect(indicatorDot).toHaveClass("bg-green-500");
  });

  it("renders 'Out Of Stock' with red dot when stock is 0 or less", () => {
    const { container } = render(<StockDisplayer stock={0} />);
    
    expect(screen.getByText("Out Of Stock")).toBeInTheDocument();
    
    // Check that it contains a red dot indicator
    const indicatorDot = container.querySelector(".rounded-full");
    expect(indicatorDot).toBeInTheDocument();
    expect(indicatorDot).toHaveClass("bg-red-500");
  });
});
