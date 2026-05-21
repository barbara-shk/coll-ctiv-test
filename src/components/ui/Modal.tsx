"use client";

import {
  ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import { Stack } from "@/components/ui/Layout";

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.space[4]};
  z-index: ${({ theme }) => theme.zIndices.modal};
`;

const Panel = styled(motion.div)<{ $maxWidth?: string }>`
  position: relative;
  width: 100%;
  max-width: ${({ $maxWidth = "440px" }) => $maxWidth};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii["3xl"]};
  padding: ${({ theme }) =>
    `${theme.space[8]} ${theme.space[7]} ${theme.space[7]}`};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const CloseSlot = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space[3]};
  right: ${({ theme }) => theme.space[3]};
`;

const Header = styled(Stack).attrs({ $gap: 2 })`
  margin-bottom: ${({ theme }) => theme.space[5]};
  text-align: center;
`;

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  /** Accessible label override — required when no `title` is provided. */
  ariaLabel?: string;
  /** Max width for the panel. Defaults to 440px. */
  maxWidth?: string;
  children: ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  ariaLabel,
  maxWidth,
  children,
}: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector));

    (getFocusable()[0] ?? panel).focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = getFocusable();
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <Panel
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-label={!title ? ariaLabel : undefined}
            tabIndex={-1}
            $maxWidth={maxWidth}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <CloseSlot>
              <IconButton
                aria-label="Close dialog"
                onClick={onClose}
                $variant="ghost"
                $size="md"
              >
                <CloseIcon size={20} />
              </IconButton>
            </CloseSlot>
            {(title || description) && (
              <Header>
                {title && (
                  <Heading id={titleId} level={3} align="center">
                    {title}
                  </Heading>
                )}
                {description && (
                  <Text size="md" tone="muted" align="center">
                    {description}
                  </Text>
                )}
              </Header>
            )}
            {children}
          </Panel>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
