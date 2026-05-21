"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import styled, { css } from "styled-components";

interface TileSurfaceProps {
  $selected?: boolean;
  $tone?: "default" | "muted";
}

const TileSurface = styled.button<TileSurfaceProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[2]}`};
  min-height: 76px;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme, $tone = "default" }) =>
    $tone === "muted" ? theme.colors.surfaceMuted : theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.snug};
  text-align: center;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.base},
    background-color ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.fast};

  > svg {
    color: ${({ theme }) => theme.colors.text.primary};
    transition: color ${({ theme }) => theme.transitions.base};
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    border-color: ${({ theme }) => theme.colors.borderInteractive};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  ${({ $selected, theme }) =>
    $selected &&
    css`
      border-color: ${theme.colors.brandHighlight};
      background: ${theme.colors.brandHighlightTint};
      box-shadow: ${theme.shadows.focusAccent};

      > svg {
        color: ${theme.colors.brand};
      }
    `}
`;

export interface TileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: ReactNode;
  selected?: boolean;
  tone?: "default" | "muted";
}

export const Tile = forwardRef<HTMLButtonElement, TileProps>(function Tile(
  { icon, label, selected, tone, type = "button", ...rest },
  ref
) {
  return (
    <TileSurface
      ref={ref}
      type={type}
      $selected={selected}
      $tone={tone}
      {...rest}
    >
      {icon}
      <span>{label}</span>
    </TileSurface>
  );
});
