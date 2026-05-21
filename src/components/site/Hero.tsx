"use client";

import Image from "next/image";
import styled from "styled-components";
import { Container, Heading, Reveal, Stack, Text } from "@/components/ui";
import { CreatePotWidget } from "./CreatePotWidget";

const Wrap = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => `${theme.space[8]} 0 ${theme.space[11]}`};

  ${({ theme }) => theme.media.md} {
    padding: ${({ theme }) => `${theme.space[11]} 0 ${theme.space[14]}`};
  }
`;

const Inner = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[8]};
`;

const Intro = styled(Stack)`
  max-width: 960px;
  margin: 0 auto;
`;

const Columns = styled.div`
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
        <Intro $gap={3} $align="center">
          <Reveal>
            <Heading
              level={1}
              size="7xl"
              tone="heading"
              leading="heading"
              tracking="snug"
              align="center"
            >
              Collect money without sharing bank details.
            </Heading>
          </Reveal>
          <Reveal delay={120}>
            <Text
              size="xl"
              family="secondary"
              tone="secondary"
              leading="relaxed"
              align="center"
            >
              Organise the things you love with the people you love — without
              getting stuck with the bill.
            </Text>
          </Reveal>
        </Intro>
        <Columns>
          <Reveal delay={220}>
            <CreatePotWidget />
          </Reveal>
          <Reveal delay={320}>
            <Visual aria-hidden>
              <Image
                src="/assets/cheer-hero-illustration.png"
                alt=""
                width={483}
                height={435}
                priority
              />
            </Visual>
          </Reveal>
        </Columns>
      </Inner>
    </Wrap>
  );
}
