import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Clean up DOM after each test
afterEach(() => {
  cleanup();
});

// Mock ResizeObserver globally for Radix UI components (like Slider)
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;
