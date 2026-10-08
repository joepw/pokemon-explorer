// @vitest-environment jsdom

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useDebouncedValue } from "./useDebouncedValue";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useDebouncedValue", () => {
  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebouncedValue("pika", 300));
    expect(result.current).toBe("pika");
  });

  it("only updates after the delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "p" } }
    );

    rerender({ value: "pi" });
    expect(result.current).toBe("p");

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe("p");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("pi");
  });

  it("keeps only the latest value when input changes rapidly", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: "p" } }
    );

    rerender({ value: "pi" });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    rerender({ value: "pik" });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe("p");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe("pik");
  });

  it("respects a custom delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 500),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "b" });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe("b");
  });
});