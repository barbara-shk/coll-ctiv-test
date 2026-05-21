"use client";

import styled from "styled-components";
import { Container, Heading, Stack, Text } from "@/components/ui";
import { SectionRoot } from "./shared";

const StatsRoot = styled(SectionRoot)`
  padding: ${({ theme }) => `${theme.space[14]} 0`};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => `${theme.space[9]} ${theme.space[6]}`};
  width: 100%;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const STATS: Array<{ num: string; label: string }> = [
  { num: "1.8m", label: "Users" },
  { num: "£200m", label: "Processed" },
  { num: "175", label: "Countries" },
  { num: "5m", label: "Transactions" },
];

export function StatsBanner() {
  return (
    <StatsRoot $tone="brand">
      <Container>
        <Stack $gap={10} $align="center">
          <Heading level={2} tone="inverse" align="center">
            You&apos;re in great company 😎
          </Heading>
          <StatGrid>
            {STATS.map((s) => (
              <Stack key={s.label} $gap={2} $align="center">
                <Heading level={2} size="8xl" tone="accent" align="center">
                  {s.num}
                </Heading>
                <Text
                  weight="medium"
                  tone="inverse"
                  align="center"
                  style={{ fontSize: "34px", lineHeight: "44px" }}
                >
                  {s.label}
                </Text>
              </Stack>
            ))}
          </StatGrid>
        </Stack>
      </Container>
    </StatsRoot>
  );
}
