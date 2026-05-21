"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Card,
  Field,
  Heading,
  Stack,
  TextInput,
  Tile,
} from "@/components/ui";
import {
  PencilIcon,
  StarIcon,
} from "@/components/ui/Icon";
import { usePot } from "@/context/PotContext";
import {
  POT_CATEGORIES,
  POT_NAME_MAX_LENGTH,
  PotCategoryId,
} from "@/types/pot";

/* -------------------------------------------------------------------------- */
/* Subcomponents specific to this widget                                      */
/* -------------------------------------------------------------------------- */

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space[3]};

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const TrustRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.fontSizes.xs};

  .stars {
    display: inline-flex;
    color: ${({ theme }) => theme.colors.starGold};
    gap: 1px;
  }
`;

const ErrorMessage = styled(motion.p)`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.danger};
`;

/* -------------------------------------------------------------------------- */
/* Static config                                                              */
/* -------------------------------------------------------------------------- */

// Yellow focus halo matching the selected-Tile styling, scoped to the
// hero widget's input. Double `&&` raises specificity above the shared
// InputShell rule in Field.tsx, and the `:not([data-invalid])` guard
// keeps the danger styling intact when validation fails.
const HighlightInput = styled.div`
  && > div:focus-within:not([data-invalid]) {
    border-color: ${({ theme }) => theme.colors.brandHighlight};
    box-shadow: ${({ theme }) => theme.shadows.focusAccent};
  }
`;

const CATEGORY_EMOJI: Record<PotCategoryId, string> = {
  trip: "✈️",
  gift: "🎁",
  sport: "🏃",
  peeps: "🎉",
  other: "✨",
  charity: "🖤",
};

function sanitiseName(raw: string): string {
  return raw
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, POT_NAME_MAX_LENGTH);
}

const errorMotion = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

/* -------------------------------------------------------------------------- */
/* CreatePotWidget                                                            */
/* -------------------------------------------------------------------------- */

export function CreatePotWidget() {
  const router = useRouter();
  const { savePot } = usePot();
  const categoryLabelId = useId();
  const nameInputId = useId();

  const [categoryId, setCategoryId] = useState<PotCategoryId | null>(null);
  const [name, setName] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const trimmedName = name.trim();
  const categoryError = !categoryId ? "Please choose a category" : null;
  const nameError = !trimmedName ? "Please give your pot a name" : null;
  const hasErrors = Boolean(categoryError || nameError);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (hasErrors || !categoryId) {
      setShowErrors(true);
      return;
    }
    setSubmitting(true);
    savePot({ name: trimmedName, categoryId });
    setTimeout(() => router.push("/app/pot"), 220);
  };

  return (
    <Card $pad={6} as="section" aria-labelledby={categoryLabelId}>
      <Stack as="form" $gap={5} onSubmit={handleSubmit} noValidate>
        <Stack $gap={3}>
          <Heading id={categoryLabelId} level={5}>
            What are you collecting for?
          </Heading>
          <CategoryGrid role="radiogroup" aria-labelledby={categoryLabelId}>
            {POT_CATEGORIES.map((category) => {
              const emoji = CATEGORY_EMOJI[category.id];
              const selected = categoryId === category.id;
              return (
                <Tile
                  key={category.id}
                  role="radio"
                  aria-checked={selected}
                  selected={selected}
                  icon={<span style={{ fontSize: "24px" }}>{emoji}</span>}
                  label={category.label}
                  onClick={() => {
                    setCategoryId(category.id);
                    if (showErrors) setShowErrors(false);
                  }}
                />
              );
            })}
          </CategoryGrid>
          <AnimatePresence>
            {showErrors && categoryError && (
              <ErrorMessage {...errorMotion} role="alert">
                {categoryError}
              </ErrorMessage>
            )}
          </AnimatePresence>
        </Stack>

        <Field
          htmlFor={nameInputId}
          label="What should we call the pot?"
          labelAddon={`${name.length}/${POT_NAME_MAX_LENGTH}`}
          error={showErrors && nameError ? nameError : undefined}
        >
          <HighlightInput>
            <TextInput
              id={nameInputId}
              type="text"
              maxLength={POT_NAME_MAX_LENGTH}
              placeholder="e.g. John's Birthday"
              value={name}
              onChange={(event) => setName(sanitiseName(event.target.value))}
              autoComplete="off"
              invalid={showErrors && !!nameError}
              leftAdornment={<PencilIcon size={18} />}
            />
          </HighlightInput>
        </Field>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={submitting}
          shape="pill"
        >
          {submitting ? "Creating…" : "Create your pot"}
        </Button>

        <TrustRow>
          <span className="stars" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} size={12} />
            ))}
          </span>
          Trusted by 3000+ App Store reviewers
        </TrustRow>
      </Stack>
    </Card>
  );
}
