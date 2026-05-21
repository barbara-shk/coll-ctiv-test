"use client";

import styled from "styled-components";
import { Button, Container, Heading, Stack, Text } from "@/components/ui";
import { SectionRoot } from "./shared";

const TwoColumn = styled(Container)`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: ${({ theme }) => theme.space[12]};
  }
`;

const PhoneMockup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
  }
`;

export function PurpleStorySection() {
  return (
    <SectionRoot $tone="brand">
      <TwoColumn>
        <Stack $gap={4} $align="flex-start">
          <Heading level={2} tone="inverse">
            Organise the things you love with the people you love — without
            getting stuck with the bill.
          </Heading>
          <Text size="lg" tone="inverse" leading="body">
            We know it can be super awkward (and frustrating!) chasing people down
            for money, so we&apos;ve made it easy to collect money from groups of
            people. Here&apos;s how:
          </Text>
          <Text size="lg" tone="inverse" leading="body">
            1) You request money from friends by sending them a custom payment
            link or QR code.
          </Text>
          <Text size="lg" tone="inverse" leading="body">
            2) They use Apple Pay, Google Pay or their digital wallet to pay you
            (no bank details, account creation, or app download required).
          </Text>
          <Button href="/app/pot/new" size="lg" shape="pill" fullWidth={false}>
            Collect money now
          </Button>
        </Stack>
        <PhoneMockup aria-hidden>
          <img src="/assets/phone-mockup.png" alt="" />
        </PhoneMockup>
      </TwoColumn>
    </SectionRoot>
  );
}
