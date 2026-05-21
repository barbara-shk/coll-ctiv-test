"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { CreatedPot, PotCategoryId, POT_STORAGE_KEY } from "@/types/pot";

interface PotContextValue {
  pot: CreatedPot | null;
  hydrated: boolean;
  savePot: (input: { name: string; categoryId: PotCategoryId }) => CreatedPot;
  clearPot: () => void;
}

const PotContext = createContext<PotContextValue | undefined>(undefined);

const inTabListeners = new Set<() => void>();

function notifyInTab() {
  for (const callback of inTabListeners) callback();
}

function subscribePot(callback: () => void) {
  inTabListeners.add(callback);
  const onCrossTabStorage = (event: StorageEvent) => {
    if (event.key === POT_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onCrossTabStorage);
  return () => {
    inTabListeners.delete(callback);
    window.removeEventListener("storage", onCrossTabStorage);
  };
}

// useSyncExternalStore compares snapshots by Object.is, so cache the parsed
// pot against its raw JSON to keep referential identity stable between reads.
let cachedRaw: string | null = null;
let cachedPot: CreatedPot | null = null;

function getPotSnapshot(): CreatedPot | null {
  const raw = window.localStorage.getItem(POT_STORAGE_KEY);
  if (raw === cachedRaw) return cachedPot;
  cachedRaw = raw;
  if (!raw) {
    cachedPot = null;
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as CreatedPot;
    cachedPot = parsed?.name && parsed?.categoryId ? parsed : null;
  } catch {
    cachedPot = null;
  }
  return cachedPot;
}

function getPotServerSnapshot(): CreatedPot | null {
  return null;
}

const subscribeHydrated = () => () => {};
const getHydratedClient = () => true;
const getHydratedServer = () => false;

export function PotProvider({ children }: { children: React.ReactNode }) {
  const pot = useSyncExternalStore(
    subscribePot,
    getPotSnapshot,
    getPotServerSnapshot
  );
  const hydrated = useSyncExternalStore(
    subscribeHydrated,
    getHydratedClient,
    getHydratedServer
  );

  const savePot = useCallback<PotContextValue["savePot"]>(
    ({ name, categoryId }) => {
      const created: CreatedPot = {
        id: crypto.randomUUID(),
        name: name.trim(),
        categoryId,
        createdAt: new Date().toISOString(),
      };
      window.localStorage.setItem(POT_STORAGE_KEY, JSON.stringify(created));
      notifyInTab();
      return created;
    },
    []
  );

  const clearPot = useCallback(() => {
    window.localStorage.removeItem(POT_STORAGE_KEY);
    notifyInTab();
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
