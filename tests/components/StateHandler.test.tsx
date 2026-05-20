import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StateHandler from "../../src/components/common/StateHandler";

describe("StateHandler Component (src/components/common/StateHandler.tsx)", () => {
  it("renders custom or default loading fallback when isLoading is true", () => {
    // Test custom fallback
    render(
      <StateHandler isLoading={true} loadingFallback={<div>Custom Loading...</div>}>
        <div>Active Content</div>
      </StateHandler>
    );
    expect(screen.getByText("Custom Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Active Content")).not.toBeInTheDocument();
  });

  it("renders error fallback when isError is true", () => {
    render(
      <StateHandler isError={true} errorFallback="Custom Error Message">
        <div>Active Content</div>
      </StateHandler>
    );
    expect(screen.getByText("Custom Error Message")).toBeInTheDocument();
    expect(screen.queryByText("Active Content")).not.toBeInTheDocument();
  });

  it("renders empty fallback when isEmpty is true", () => {
    render(
      <StateHandler isEmpty={true} emptyFallback="Custom Empty Message">
        <div>Active Content</div>
      </StateHandler>
    );
    expect(screen.getByText("Custom Empty Message")).toBeInTheDocument();
    expect(screen.queryByText("Active Content")).not.toBeInTheDocument();
  });

  it("renders children when no loading, error, or empty states are active", () => {
    render(
      <StateHandler isLoading={false} isError={false} isEmpty={false}>
        <div>Active Content</div>
      </StateHandler>
    );
    expect(screen.getByText("Active Content")).toBeInTheDocument();
  });
});
