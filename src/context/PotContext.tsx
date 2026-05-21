"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CreatedPot, PotCategoryId, POT_STORAGE_KEY } from "@/types/pot";

interface PotContextValue {
  pot: CreatedPot | null;
  hydrated: boolean;
  savePot: (input: { name: string; categoryId: PotCategoryId }) => CreatedPot;
  clearPot: () => void;
}

const PotContext = createContext<PotContextValue | undefined>(undefined);

function readStoredPot(): CreatedPot | null {
  try {
    const raw = window.localStorage.getItem(POT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CreatedPot;
    return parsed?.name && parsed?.categoryId ? parsed : null;
  } catch {
    return null;
  }
}

export function PotProvider({ children }: { children: React.ReactNode }) {
  const [pot, setPot] = useState<CreatedPot | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPot(readStoredPot());
    setHydrated(true);

    const onStorage = (event: StorageEvent) => {
      if (event.key === POT_STORAGE_KEY) setPot(readStoredPot());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const savePot = useCallback<PotContextValue["savePot"]>(
    ({ name, categoryId }) => {
      const created: CreatedPot = {
        id: crypto.randomUUID(),
        name: name.trim(),
        categoryId,
        createdAt: new Date().toISOString(),
      };
      window.localStorage.setItem(POT_STORAGE_KEY, JSON.stringify(created));
      setPot(created);
      return created;
    },
    []
  );

  const clearPot = useCallback(() => {
    window.localStorage.removeItem(POT_STORAGE_KEY);
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
  if (!ctx) throw new Error("usePot must be used within a PotProvider");
  return ctx;
}
