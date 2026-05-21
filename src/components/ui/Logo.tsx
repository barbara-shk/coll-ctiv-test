"use client";

import styled, { useTheme } from "styled-components";

const Wrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  letter-spacing: ${({ theme }) => theme.letterSpacings.snug};
`;

interface LogoProps {
  variant?: "dark" | "light";
  size?: number;
}

export function Logo({ variant = "dark", size = 28 }: LogoProps) {
  const theme = useTheme();
  const wordColor =
    variant === "light" ? theme.colors.text.inverse : theme.colors.text.brand;

  return (
    <Wrap style={{ color: wordColor }} aria-label="Collctiv">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
      >
        <circle cx="16" cy="16" r="14" fill={theme.colors.brandAccent} />
        <path
          d="M22.5 11.5a8.5 8.5 0 0 0-8.5-2.5 8 8 0 0 0-2.7 14.2 8.4 8.4 0 0 0 11.2-1.7"
          stroke={theme.colors.text.inverse}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="22.5" cy="11.5" r="2.4" fill={theme.colors.brand} />
      </svg>
      <span>Collctiv</span>
    </Wrap>
  );
}
