"use client";

import styled, { css, DefaultTheme } from "styled-components";

type SurfaceTone = "default" | "muted" | "subtle" | "tinted" | "inverse";
type SurfaceElevation = "none" | "sm" | "md" | "lg" | "card" | "cardElevated" | "hero";
type SurfaceRadius = keyof DefaultTheme["radii"];
type SurfacePad = keyof DefaultTheme["space"];

interface SurfaceProps {
  $tone?: SurfaceTone;
  $elevation?: SurfaceElevation;
  $radius?: SurfaceRadius;
  $pad?: SurfacePad;
  $padX?: SurfacePad;
  $padY?: SurfacePad;
  $bordered?: boolean;
}

const toneBg = (theme: DefaultTheme, tone: SurfaceTone) => {
  switch (tone) {
    case "default":
      return theme.colors.surface;
    case "muted":
      return theme.colors.surfaceMuted;
    case "subtle":
      return theme.colors.surfaceSubtle;
    case "tinted":
      return theme.colors.surfaceTinted;
    case "inverse":
      return theme.colors.surfaceInverse;
  }
};

export const Surface = styled.div<SurfaceProps>`
  background: ${({ theme, $tone = "default" }) => toneBg(theme, $tone)};
  border-radius: ${({ theme, $radius = "2xl" }) => theme.radii[$radius]};
  box-shadow: ${({ theme, $elevation = "none" }) =>
    $elevation === "none" ? "none" : theme.shadows[$elevation]};
  ${({ $bordered, theme }) =>
    $bordered &&
    css`
      border: 1px solid ${theme.colors.border};
    `}
  ${({ theme, $pad }) =>
    $pad !== undefined &&
    css`
      padding: ${theme.space[$pad]};
    `}
  ${({ theme, $padX }) =>
    $padX !== undefined &&
    css`
      padding-left: ${theme.space[$padX]};
      padding-right: ${theme.space[$padX]};
    `}
  ${({ theme, $padY }) =>
    $padY !== undefined &&
    css`
      padding-top: ${theme.space[$padY]};
      padding-bottom: ${theme.space[$padY]};
    `}
`;

export const Card = styled(Surface).attrs<SurfaceProps>((props) => ({
  $tone: props.$tone ?? "default",
  $elevation: props.$elevation ?? "card",
  $radius: props.$radius ?? "2xl",
  $pad: props.$pad ?? 6,
  $bordered: props.$bordered ?? true,
}))``;
