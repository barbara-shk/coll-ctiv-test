"use client";

import styled, { css, DefaultTheme } from "styled-components";

type TextSize = keyof DefaultTheme["fontSizes"];
type TextWeight = keyof DefaultTheme["fontWeights"];
type TextFamily = keyof DefaultTheme["fonts"];
type TextTone =
  | "primary"
  | "heading"
  | "secondary"
  | "muted"
  | "subtle"
  | "inverse"
  | "brand"
  | "danger";

interface TypographyProps {
  $size?: TextSize;
  $weight?: TextWeight;
  $family?: TextFamily;
  $tone?: TextTone;
  $align?: "left" | "center" | "right";
  $leading?: keyof DefaultTheme["lineHeights"];
  $tracking?: keyof DefaultTheme["letterSpacings"];
  $italic?: boolean;
  $truncate?: boolean;
}

const toneColor = (theme: DefaultTheme, tone: TextTone) => {
  switch (tone) {
    case "primary":
      return theme.colors.text.primary;
    case "heading":
      return theme.colors.text.heading;
    case "secondary":
      return theme.colors.text.secondary;
    case "muted":
      return theme.colors.text.muted;
    case "subtle":
      return theme.colors.text.subtle;
    case "inverse":
      return theme.colors.text.inverse;
    case "brand":
      return theme.colors.text.brand;
    case "danger":
      return theme.colors.danger;
  }
};

const typographyMixin = css<TypographyProps>`
  margin: 0;
  font-family: ${({ theme, $family = "body" }) => theme.fonts[$family]};
  font-size: ${({ theme, $size = "lg" }) => theme.fontSizes[$size]};
  font-weight: ${({ theme, $weight = "regular" }) =>
    theme.fontWeights[$weight]};
  color: ${({ theme, $tone = "primary" }) => toneColor(theme, $tone)};
  line-height: ${({ theme, $leading = "body" }) => theme.lineHeights[$leading]};
  letter-spacing: ${({ theme, $tracking = "normal" }) =>
    theme.letterSpacings[$tracking]};
  text-align: ${({ $align = "left" }) => $align};
  ${({ $italic }) => $italic && "font-style: italic;"}
  ${({ $truncate }) =>
    $truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;

/* ---- Heading ---- */

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingPresets {
  size: TextSize;
  weight: TextWeight;
  leading: keyof DefaultTheme["lineHeights"];
  tracking: keyof DefaultTheme["letterSpacings"];
  tone?: TextTone;
}

const headingPresets: Record<HeadingLevel, HeadingPresets> = {
  1: { size: "6xl", weight: "bold", leading: "tight", tracking: "tight" },
  2: {
    size: "7xl",
    weight: "bold",
    leading: "heading",
    tracking: "snug",
    tone: "heading",
  },
  3: { size: "3xl", weight: "bold", leading: "snug", tracking: "snug" },
  4: { size: "2xl", weight: "semibold", leading: "snug", tracking: "normal" },
  5: { size: "lg", weight: "semibold", leading: "relaxed", tracking: "normal" },
  6: { size: "md", weight: "semibold", leading: "base", tracking: "normal" },
};

const StyledHeading = styled.h1<TypographyProps>`
  ${typographyMixin}
  font-family: ${({ theme }) => theme.fonts.display};
`;

export interface HeadingProps
  extends Omit<
    React.HTMLAttributes<HTMLHeadingElement>,
    "color" | "className"
  > {
  level?: HeadingLevel;
  /** Override the rendered tag while keeping the visual `level` */
  as?: React.ElementType;
  size?: TextSize;
  weight?: TextWeight;
  leading?: keyof DefaultTheme["lineHeights"];
  tracking?: keyof DefaultTheme["letterSpacings"];
  tone?: TextTone;
  align?: "left" | "center" | "right";
  className?: string;
}

export function Heading({
  level = 2,
  as,
  size,
  weight,
  leading,
  tracking,
  tone,
  align,
  ...rest
}: HeadingProps) {
  const preset = headingPresets[level];
  const Tag = (as ?? (`h${level}` as React.ElementType));
  return (
    <StyledHeading
      as={Tag}
      $size={size ?? preset.size}
      $weight={weight ?? preset.weight}
      $leading={leading ?? preset.leading}
      $tracking={tracking ?? preset.tracking}
      $tone={tone ?? preset.tone}
      $align={align}
      {...rest}
    />
  );
}

/* ---- Text ---- */

const StyledText = styled.p<TypographyProps>`
  ${typographyMixin}
`;

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color" | "className"> {
  as?: React.ElementType;
  size?: TextSize;
  weight?: TextWeight;
  family?: TextFamily;
  tone?: TextTone;
  align?: "left" | "center" | "right";
  leading?: keyof DefaultTheme["lineHeights"];
  tracking?: keyof DefaultTheme["letterSpacings"];
  italic?: boolean;
  truncate?: boolean;
  className?: string;
}

export function Text({
  as = "p",
  size,
  weight,
  family,
  tone,
  align,
  leading,
  tracking,
  italic,
  truncate,
  ...rest
}: TextProps) {
  return (
    <StyledText
      as={as}
      $size={size}
      $weight={weight}
      $family={family}
      $tone={tone}
      $align={align}
      $leading={leading}
      $tracking={tracking}
      $italic={italic}
      $truncate={truncate}
      {...rest}
    />
  );
}

/* ---- Label (form labels) ---- */

export const Label = styled.label<{ $tone?: TextTone }>`
  display: block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme, $tone = "primary" }) => toneColor(theme, $tone)};
  line-height: ${({ theme }) => theme.lineHeights.snug};
`;
