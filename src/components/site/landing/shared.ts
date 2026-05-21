"use client";

import styled from "styled-components";

export const SectionRoot = styled.section<{ $tone?: "default" | "muted" | "brand" }>`
  background: ${({ theme, $tone = "default" }) =>
    $tone === "muted"
      ? theme.colors.surfaceMuted
      : $tone === "brand"
        ? theme.colors.surfaceInverse
        : theme.colors.surface};
  color: ${({ theme, $tone = "default" }) =>
    $tone === "brand"
      ? theme.colors.text.inverse
      : theme.colors.text.primary};
  padding: ${({ theme }) => `${theme.space[12]} 0`};
`;
