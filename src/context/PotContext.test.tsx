import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { PotProvider, usePot } from "./PotContext";
import { POT_STORAGE_KEY } from "@/types/pot";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PotProvider>{children}</PotProvider>
);

describe("PotContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts unhydrated and then hydrates without a pot", () => {
    const { result } = renderHook(() => usePot(), { wrapper });
    expect(result.current.pot).toBeNull();
  });

  it("savePot persists to localStorage and exposes the pot", () => {
    const { result } = renderHook(() => usePot(), { wrapper });

    act(() => {
      result.current.savePot({ name: "Holiday 2026", categoryId: "trip" });
    });

    expect(result.current.pot).toMatchObject({
      name: "Holiday 2026",
      categoryId: "trip",
    });
    const stored = JSON.parse(
      window.localStorage.getItem(POT_STORAGE_KEY) ?? "null"
    );
    expect(stored.name).toBe("Holiday 2026");
  });

  it("hydrates from existing localStorage on subsequent loads", () => {
    window.localStorage.setItem(
      POT_STORAGE_KEY,
      JSON.stringify({
        id: "p_1",
        name: "Recovered Pot",
        categoryId: "charity",
        createdAt: new Date().toISOString(),
      })
    );

    const { result } = renderHook(() => usePot(), { wrapper });
    expect(result.current.pot?.name).toBe("Recovered Pot");
  });

  it("clearPot removes the pot from state and storage", () => {
    const { result } = renderHook(() => usePot(), { wrapper });

    act(() => {
      result.current.savePot({ name: "Temp", categoryId: "gift" });
    });
    expect(result.current.pot).not.toBeNull();

    act(() => result.current.clearPot());

    expect(result.current.pot).toBeNull();
    expect(window.localStorage.getItem(POT_STORAGE_KEY)).toBeNull();
  });
});
