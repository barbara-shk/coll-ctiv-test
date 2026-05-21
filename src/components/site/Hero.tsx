"use client";

import styled, { useTheme } from "styled-components";
import { Container, Heading, Stack, Text } from "@/components/ui";
import { CreatePotWidget } from "./CreatePotWidget";

const Wrap = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => `${theme.space[8]} 0 ${theme.space[11]}`};

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => `${theme.space[11]} 0 ${theme.space[14]}`};
  }
`;

const Inner = styled(Container)`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
    align-items: center;
    gap: ${({ theme }) => theme.space[12]};
  }
`;

const Visual = styled.div`
  position: relative;
  display: none;
  aspect-ratio: 4 / 5;
  background: radial-gradient(circle at 60% 40%, #ffe8a3 0%, #ffd0a0 55%, #ff96a5 100%);
  border-radius: ${({ theme }) => theme.radii["3xl"]};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.hero};

  ${({ theme }) => theme.media.md} {
    display: block;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.space[5]};
  left: ${({ theme }) => theme.space[5]};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  background: rgba(255, 255, 255, 0.95);
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[4]}`};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.brand};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.brandAccent};
  }
`;

const Cheerleader = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
`;

function CheerleaderIllustration() {
  const theme = useTheme();
  return (
    <svg
      width="60%"
      viewBox="0 0 200 280"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Cheerleader illustration"
    >
      <defs>
        <linearGradient id="cheer-skin" x1="0" x2="1">
          <stop offset="0%" stopColor="#FFD6B4" />
          <stop offset="100%" stopColor="#F2B189" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="60" r="34" fill="url(#cheer-skin)" />
      <path
        d="M66 50c4-22 25-32 34-32s30 10 34 32c-12-8-26-8-34-4-8-4-22-4-34 4z"
        fill="#5C2E1F"
      />
      <circle cx="88" cy="62" r="3" fill={theme.colors.brand} />
      <circle cx="112" cy="62" r="3" fill={theme.colors.brand} />
      <path
        d="M88 76q12 8 24 0"
        stroke={theme.colors.brand}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M70 100 q30-12 60 0 l-6 70 q-24 8 -48 0 z"
        fill="#E11D48"
      />
      <path
        d="M86 122 L88 144 M114 122 L112 144"
        stroke={theme.colors.text.inverse}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="100"
        y="135"
        textAnchor="middle"
        fill={theme.colors.text.inverse}
        fontSize="14"
        fontWeight="700"
      >
        CHEERS
      </text>
      <path
        d="M76 170 l3 18 l5-16 l4 18 l5-16 l4 18 l5-16 l4 18 l5-16 l4 18 l5-16 l4 18 l5-16"
        fill="#E11D48"
      />
      <circle cx="44" cy="80" r="22" fill={theme.colors.brandAccent} opacity="0.85" />
      <circle cx="156" cy="80" r="22" fill={theme.colors.brandAccent} opacity="0.85" />
      <path
        d="M70 102 q-14-8 -22-22"
        stroke="url(#cheer-skin)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M130 102 q14-8 22-22"
        stroke="url(#cheer-skin)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path d="M86 200 l-4 50" stroke="url(#cheer-skin)" strokeWidth="14" strokeLinecap="round" />
      <path d="M114 200 l4 50" stroke="url(#cheer-skin)" strokeWidth="14" strokeLinecap="round" />
      <ellipse cx="82" cy="256" rx="14" ry="6" fill={theme.colors.text.inverse} />
      <ellipse cx="118" cy="256" rx="14" ry="6" fill={theme.colors.text.inverse} />
    </svg>
  );
}

export function Hero() {
  return (
    <Wrap>
      <Inner>
        <Stack $gap={5}>
          <Heading level={1}>
            Collect money without sharing bank details.
          </Heading>
          <Text size="lg" tone="secondary" leading="body">
            Organise the things you love with the people you love — without
            getting stuck with the bill.
          </Text>
          <CreatePotWidget />
        </Stack>
        <Visual aria-hidden>
          <Badge>Live · 1,824 pots today</Badge>
          <Cheerleader>
            <CheerleaderIllustration />
          </Cheerleader>
        </Visual>
      </Inner>
    </Wrap>
  );
}
