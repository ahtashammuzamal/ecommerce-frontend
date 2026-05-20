import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Pagination from "../../src/components/shop/Pagination";
import type { ProductFiltersType } from "../../src/api/products.api";

describe("Pagination Component (src/components/shop/Pagination.tsx)", () => {
  const defaultFilters: ProductFiltersType = {
    page: 1,
    limit: 6,
  };

  it("renders correct current page and max pages text", () => {
    render(
      <MemoryRouter>
        <Pagination
          totalProducts={18}
          filters={defaultFilters}
          setFilters={() => {}}
        />
      </MemoryRouter>
    );

    // 18 products / 6 limit = 3 max pages
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
  });

  it("disables the 'Previous' button on the first page", () => {
    render(
      <MemoryRouter>
        <Pagination
          totalProducts={18}
          filters={defaultFilters}
          setFilters={() => {}}
        />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole("button", { name: /previous/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it("disables the 'Next' button on the last page", () => {
    const lastPageFilters: ProductFiltersType = {
      page: 3,
      limit: 6,
    };

    render(
      <MemoryRouter>
        <Pagination
          totalProducts={18}
          filters={lastPageFilters}
          setFilters={() => {}}
        />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole("button", { name: /previous/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it("triggers setFilters callback when Next is clicked", async () => {
    const mockSetFilters = vi.fn();

    render(
      <MemoryRouter>
        <Pagination
          totalProducts={18}
          filters={defaultFilters}
          setFilters={mockSetFilters}
        />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    await userEvent.click(nextButton);

    expect(mockSetFilters).toHaveBeenCalledTimes(1);
    
    // Test the state update function behaves correctly
    const stateUpdater = mockSetFilters.mock.calls[0][0];
    const newState = stateUpdater(defaultFilters);
    expect(newState.page).toBe(2);
  });

  it("triggers setFilters callback when Previous is clicked", async () => {
    const mockSetFilters = vi.fn();
    const midFilters: ProductFiltersType = {
      page: 2,
      limit: 6,
    };

    render(
      <MemoryRouter>
        <Pagination
          totalProducts={18}
          filters={midFilters}
          setFilters={mockSetFilters}
        />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole("button", { name: /previous/i });
    await userEvent.click(prevButton);

    expect(mockSetFilters).toHaveBeenCalledTimes(1);
    
    const stateUpdater = mockSetFilters.mock.calls[0][0];
    const newState = stateUpdater(midFilters);
    expect(newState.page).toBe(1);
  });
});
