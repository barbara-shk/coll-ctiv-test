"use client";

import {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  useId,
} from "react";
import styled, { css } from "styled-components";
import { Label } from "@/components/ui/Text";

/* -------------------------------------------------------------------------- */
/* Control surface — shared input/select treatment                            */
/* -------------------------------------------------------------------------- */

const controlSurface = css<{ $invalid?: boolean; $size?: ControlSize }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  height: ${({ theme, $size = "lg" }) => theme.sizes.control[$size]};
  padding: 0 ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.body};
  transition: border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderInteractive};
  }

  &:focus-within,
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand};
    box-shadow: ${({ theme }) => theme.shadows.focusBrand};
  }

  ${({ $invalid, theme }) =>
    $invalid &&
    css`
      border-color: ${theme.colors.danger};
      box-shadow: ${theme.shadows.focusDanger};
    `}
`;

type ControlSize = keyof typeof import("@/styles/theme").theme.sizes.control;

/* -------------------------------------------------------------------------- */
/* Field — wraps label + control + helper/error                               */
/* -------------------------------------------------------------------------- */

const FieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: ${({ theme }) => theme.space[3]};
`;

const HelperText = styled.span<{ $error?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.text.muted};
`;

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  /** Right-aligned content on the label row (e.g. character counters). */
  labelAddon?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  children: ReactNode;
}

export function Field({
  label,
  labelAddon,
  helper,
  error,
  htmlFor,
  children,
  ...rest
}: FieldProps) {
  return (
    <FieldRoot {...rest}>
      {(label || labelAddon) && (
        <LabelRow>
          {label && <Label htmlFor={htmlFor}>{label}</Label>}
          {labelAddon && <HelperText>{labelAddon}</HelperText>}
        </LabelRow>
      )}
      {children}
      {(error || helper) && (
        <HelperText $error={!!error} role={error ? "alert" : undefined}>
          {error ?? helper}
        </HelperText>
      )}
    </FieldRoot>
  );
}

/* -------------------------------------------------------------------------- */
/* TextInput — input with optional left/right adornment                       */
/* -------------------------------------------------------------------------- */

const InputShell = styled.div<{ $invalid?: boolean; $size?: ControlSize }>`
  ${controlSurface}

  svg {
    color: ${({ theme }) => theme.colors.text.subtle};
    flex-shrink: 0;
  }

  input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    height: 100%;
    font: inherit;
    color: inherit;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.subtle};
    }
  }
`;

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  leftAdornment?: ReactNode;
  rightAdornment?: ReactNode;
  invalid?: boolean;
  size?: ControlSize;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { leftAdornment, rightAdornment, invalid, size, ...rest },
    ref
  ) {
    return (
      <InputShell $invalid={invalid} $size={size} data-invalid={invalid || undefined}>
        {leftAdornment}
        <input
          ref={ref}
          aria-invalid={invalid || undefined}
          {...rest}
        />
        {rightAdornment}
      </InputShell>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* Select                                                                     */
/* -------------------------------------------------------------------------- */

const SelectShell = styled.select<{ $invalid?: boolean; $size?: ControlSize }>`
  ${controlSurface}
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='1 1 6 6 11 1'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${({ theme }) => theme.space[4]} center;
  padding-right: ${({ theme }) => theme.space[9]};
`;

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  invalid?: boolean;
  size?: ControlSize;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, size, ...rest },
  ref
) {
  return (
    <SelectShell
      ref={ref}
      $invalid={invalid}
      $size={size}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
});
