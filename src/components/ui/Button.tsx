"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import styled, { css, DefaultTheme } from "styled-components";

export type ButtonVariant =
  | "primary" // yellow brand CTA
  | "secondary" // deep purple
  | "pink" // razzmatazz accent
  | "teal" // brand secondary
  | "outline" // white card with border
  | "ghost"; // transparent

export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonShape = "rounded" | "pill";

interface ButtonStyleProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $shape?: ButtonShape;
  $fullWidth?: boolean;
  $iconOnly?: boolean;
}

const sizeStyles = (theme: DefaultTheme) =>
  ({
    sm: css`
      height: ${theme.sizes.control.sm};
      padding: 0 ${theme.space[4]};
      font-size: ${theme.fontSizes.md};
    `,
    md: css`
      height: ${theme.sizes.control.md};
      padding: 0 ${theme.space[5]};
      font-size: ${theme.fontSizes.base};
    `,
    lg: css`
      height: ${theme.sizes.control.lg};
      padding: 0 ${theme.space[6]};
      font-size: ${theme.fontSizes.lg};
    `,
    xl: css`
      height: ${theme.sizes.control.xl};
      padding: 0 ${theme.space[7]};
      font-size: ${theme.fontSizes.lg};
    `,
  }) satisfies Record<ButtonSize, ReturnType<typeof css>>;

const variantStyles = (theme: DefaultTheme) =>
  ({
    primary: css`
      background: ${theme.colors.brandHighlight};
      color: ${theme.colors.text.primary};
      border-color: ${theme.colors.brandHighlight};
      &:hover:not(:disabled) {
        background: ${theme.colors.brandHighlightStrong};
        border-color: ${theme.colors.brandHighlightStrong};
      }
    `,
    secondary: css`
      background: ${theme.colors.brand};
      color: ${theme.colors.text.inverse};
      border-color: ${theme.colors.brand};
      &:hover:not(:disabled) {
        background: ${theme.colors.brandStrong};
        border-color: ${theme.colors.brandStrong};
      }
    `,
    pink: css`
      background: ${theme.colors.brandAccent};
      color: ${theme.colors.text.inverse};
      border-color: ${theme.colors.brandAccent};
      &:hover:not(:disabled) {
        background: ${theme.colors.brandAccentStrong};
        border-color: ${theme.colors.brandAccentStrong};
      }
    `,
    teal: css`
      background: ${theme.colors.brandSecondary};
      color: ${theme.colors.text.inverse};
      border-color: ${theme.colors.brandSecondary};
      &:hover:not(:disabled) {
        background: ${theme.colors.brandSecondaryStrong};
        border-color: ${theme.colors.brandSecondaryStrong};
      }
    `,
    outline: css`
      background: ${theme.colors.surface};
      color: ${theme.colors.text.primary};
      border-color: ${theme.colors.border};
      &:hover:not(:disabled) {
        background: ${theme.colors.surfaceMuted};
        border-color: ${theme.colors.borderInteractive};
      }
    `,
    ghost: css`
      background: transparent;
      color: ${theme.colors.text.secondary};
      border-color: transparent;
      &:hover:not(:disabled) {
        background: ${theme.colors.surfaceMuted};
        color: ${theme.colors.text.primary};
      }
    `,
  }) satisfies Record<ButtonVariant, ReturnType<typeof css>>;

const ButtonRoot = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  border-width: 1px;
  border-style: solid;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  user-select: none;

  border-radius: ${({ theme, $shape = "rounded" }) =>
    $shape === "pill" ? theme.radii.pill : theme.radii.lg};

  ${({ theme, $size = "md" }) => sizeStyles(theme)[$size]}
  ${({ theme, $variant = "primary" }) => variantStyles(theme)[$variant]}

  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  ${({ $iconOnly, theme, $size = "md" }) =>
    $iconOnly &&
    css`
      width: ${theme.sizes.control[$size]};
      padding: 0;
    `}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

/* -------------------------------------------------------------------------- */
/* Public Button                                                              */
/* -------------------------------------------------------------------------- */

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    shape = "rounded",
    fullWidth,
    leftIcon,
    rightIcon,
    children,
    type = "button",
    ...rest
  },
  ref
) {
  return (
    <ButtonRoot
      ref={ref}
      type={type}
      $variant={variant}
      $size={size}
      $shape={shape}
      $fullWidth={fullWidth}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </ButtonRoot>
  );
});

/* -------------------------------------------------------------------------- */
/* IconButton — square button rendering only an icon                          */
/* -------------------------------------------------------------------------- */

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Required for screen readers — icon-only buttons have no visible label. */
  "aria-label": string;
  children: ReactNode;
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $shape?: ButtonShape;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      $variant = "ghost",
      $size = "md",
      $shape = "pill",
      type = "button",
      children,
      ...rest
    },
    ref
  ) {
    return (
      <ButtonRoot
        ref={ref}
        type={type}
        $variant={$variant}
        $size={$size}
        $shape={$shape}
        $iconOnly
        {...rest}
      >
        {children}
      </ButtonRoot>
    );
  }
);
