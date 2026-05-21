export type PotCategoryId =
  | "trip"
  | "gift"
  | "sport"
  | "peeps"
  | "other"
  | "charity";

export interface PotCategory {
  id: PotCategoryId;
  label: string;
  description: string;
}

export const POT_CATEGORIES: readonly PotCategory[] = [
  {
    id: "trip",
    label: "To travel somewhere cool",
    description: "To travel somewhere cool",
  },
  {
    id: "gift",
    label: "To do a whip-round for a gift",
    description: "To do a whip-round for a gift",
  },
  {
    id: "sport",
    label: "To get sweaty and sporty",
    description: "To get sweaty and sporty",
  },
  {
    id: "peeps",
    label: "To do something fun with your peeps",
    description: "To do something fun with your peeps",
  },
  {
    id: "other",
    label: "Something else entirely",
    description: "Something else entirely",
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
