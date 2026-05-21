"use client";

import styled, { css, DefaultTheme } from "styled-components";

type Space = keyof DefaultTheme["space"];

/* ---- Container ---- */

export const Container = styled.div<{ $maxWidth?: string }>`
  width: 100%;
  max-width: ${({ theme, $maxWidth }) => $maxWidth ?? theme.layout.maxWidth};
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.layout.pagePadding};
  padding-right: ${({ theme }) => theme.layout.pagePadding};
`;

/* ---- Stack / Row / Cluster ---- */

interface FlexProps {
  $gap?: Space;
  $align?: React.CSSProperties["alignItems"];
  $justify?: React.CSSProperties["justifyContent"];
  $wrap?: boolean;
}

const flexMixin = css<FlexProps>`
  display: flex;
  gap: ${({ theme, $gap }) => (typeof $gap === "number" ? theme.space[$gap] : 0)};
  align-items: ${({ $align = "stretch" }) => $align};
  justify-content: ${({ $justify = "flex-start" }) => $justify};
  ${({ $wrap }) => $wrap && "flex-wrap: wrap;"}
`;

export const Stack = styled.div<FlexProps>`
  ${flexMixin}
  flex-direction: column;
`;

export const Row = styled.div<FlexProps>`
  ${flexMixin}
  flex-direction: row;
`;

/* ---- Spacer ---- */

export const Spacer = styled.div<{ $size?: Space }>`
  flex: ${({ $size }) => ($size === undefined ? 1 : "none")};
  width: ${({ theme, $size }) => ($size === undefined ? "auto" : theme.space[$size])};
  height: ${({ theme, $size }) => ($size === undefined ? "auto" : theme.space[$size])};
`;

/* ---- VisuallyHidden ---- */

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
