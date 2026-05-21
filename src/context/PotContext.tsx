"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CreatedPot,
  PotCategoryId,
  POT_STORAGE_KEY,
} from "@/types/pot";

interface PotContextValue {
  pot: CreatedPot | null;
  hydrated: boolean;
  savePot: (input: { name: string; categoryId: PotCategoryId }) => CreatedPot;
  clearPot: () => void;
}

const PotContext = createContext<PotContextValue | undefined>(undefined);

function readStoredPot(): CreatedPot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(POT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CreatedPot;
    if (!parsed?.name || !parsed?.categoryId) return null;
    return parsed;
  } catch {
    return null;
  }
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `pot_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

export function PotProvider({ children }: { children: React.ReactNode }) {
  const [pot, setPot] = useState<CreatedPot | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPot(readStoredPot());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (event: StorageEvent) => {
      if (event.key === POT_STORAGE_KEY) {
        setPot(readStoredPot());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const savePot = useCallback<PotContextValue["savePot"]>(
    ({ name, categoryId }) => {
      const created: CreatedPot = {
        id: makeId(),
        name: name.trim(),
        categoryId,
        createdAt: new Date().toISOString(),
      };
      if (typeof window !== "undefined") {
        window.localStorage.setItem(POT_STORAGE_KEY, JSON.stringify(created));
      }
      setPot(created);
      return created;
    },
    []
  );

  const clearPot = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(POT_STORAGE_KEY);
    }
    setPot(null);
  }, []);

  const value = useMemo<PotContextValue>(
    () => ({ pot, hydrated, savePot, clearPot }),
    [pot, hydrated, savePot, clearPot]
  );

  return <PotContext.Provider value={value}>{children}</PotContext.Provider>;
}

export function usePot(): PotContextValue {
  const ctx = useContext(PotContext);
  if (!ctx) {
    throw new Error("usePot must be used within a PotProvider");
  }
  return ctx;
}
