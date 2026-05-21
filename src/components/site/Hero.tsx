"use client";

import styled from "styled-components";
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
  display: none;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.md} {
    display: flex;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

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
          <img src="/assets/cheer-hero-illustration.png" alt="" />
        </Visual>
      </Inner>
    </Wrap>
  );
}
