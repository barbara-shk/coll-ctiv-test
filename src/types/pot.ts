export type PotCategoryId =
  | "trip"
  | "gift"
  | "sport"
  | "charity";

export interface PotCategory {
  id: PotCategoryId;
  label: string;
  description: string;
}

export const POT_CATEGORIES: readonly PotCategory[] = [
  {
    id: "trip",
    label: "To travel somewhere with friends",
    description: "To travel somewhere with friends",
  },
  {
    id: "gift",
    label: "To pitch in for a gift",
    description: "To pitch in for a gift",
  },
  {
    id: "sport",
    label: "To get sporty",
    description: "To get sporty",
  },
  {
    id: "charity",
    label: "To raise money for charity",
    description: "To raise money for charity",
  },
] as const;

export interface PotDraft {
  categoryId: PotCategoryId | null;
  name: string;
}

export interface CreatedPot {
  id: string;
  name: string;
  categoryId: PotCategoryId;
  createdAt: string;
}

export const POT_STORAGE_KEY = "collctiv:pot";
export const POT_NAME_MAX_LENGTH = 50;
