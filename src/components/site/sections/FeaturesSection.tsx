"use client";

import styled, { css, keyframes } from "styled-components";
import { Button, Container, Heading, Reveal, Stack, Text } from "@/components/ui";
import { useInView } from "@/hooks/useInView";
import { SectionRoot } from "./shared";
import { CustomisePotSvg } from "./CustomisePotSvg";

const FeatureRow = styled(Container)<{ $reverse?: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  grid-template-columns: 1fr;
  align-items: center;
  padding-top: ${({ theme }) => theme.space[10]};
  padding-bottom: ${({ theme }) => theme.space[10]};

  > *:nth-child(2) {
    order: -1;
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.space[12]};

    > *:nth-child(2) {
      order: 0;
    }
  }

  ${({ $reverse, theme }) =>
    $reverse &&
    css`
      ${theme.media.md} {
        > *:first-child {
          order: 2;
        }
      }
    `}
`;

const reveal = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PotIllustration = styled.div<{ $play: boolean }>`
  width: 100%;
  max-width: 460px;
  margin: 0 auto;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  g[data-el] {
    opacity: 0;
  }

  g[data-el="banner"] { --d: 0ms; }
  g[data-el="banner-text"] { --d: 220ms; }
  g[data-el="calendar"] { --d: 420ms; }
  g[data-el="calendar-num"] { --d: 560ms; }
  g[data-el="calendar-line"] { --d: 680ms; }
  g[data-el="calendar-top"] { --d: 780ms; }
  g[data-el="brush"] { --d: 920ms; }

  ${({ $play }) =>
    $play &&
    css`
      g[data-el] {
        animation: ${reveal} 0.55s ease-out forwards;
        animation-delay: var(--d, 0ms);
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    g[data-el] {
      opacity: 1;
      animation: none;
    }
  }
`;

const MediaWrap = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0 auto;

  ${({ theme }) => theme.media.md} {
    max-width: 460px;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const StaticIllustration = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0 auto;

  ${({ theme }) => theme.media.md} {
    max-width: 486px;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

function FeatureCopy({ title, body }: { title: string; body: string }) {
  return (
    <Stack $gap={4} $align="flex-start">
      <Heading level={2}>{title}</Heading>
      <Text size="xl" tone="heading" leading="relaxed">
        {body}
      </Text>
      <Button href="/app/pot/new" size="lg" shape="pill" fullWidth={false}>
        Collect money now
      </Button>
    </Stack>
  );
}

export function FeaturesSection() {
  const { ref: customiseRef, inView: customiseInView } = useInView<HTMLDivElement>(0.25);

  return (
    <SectionRoot>
      <FeatureRow>
        <Reveal>
          <FeatureCopy
            title="Customise your Pot"
            body="Customise your Pot, send a closing date, show who's paid in already, add a fundraising target, add extra information about the collection, and more."
          />
        </Reveal>
        <div ref={customiseRef}>
          <PotIllustration $play={customiseInView}>
            <CustomisePotSvg />
          </PotIllustration>
        </div>
      </FeatureRow>

      <FeatureRow $reverse>
        <Reveal>
          <FeatureCopy
            title="Keep money separate from your bank"
            body="Don't mix group money in with your personal bank account. Keep track of who's paid what and when."
          />
        </Reveal>
        <Reveal delay={140}>
          <MediaWrap>
            <img src="/assets/separate-from-bank.svg" alt="" />
          </MediaWrap>
        </Reveal>
      </FeatureRow>

      <FeatureRow>
        <Reveal>
          <FeatureCopy
            title="Making a payment takes seconds"
            body="Anyone paying into the collection pot just uses their card details or they can use Apple Pay or Google Pay. No need to sign up for an account or download an app, just tap and you're done! The money appears in your pot instantly."
          />
        </Reveal>
        <Reveal delay={140}>
          <StaticIllustration>
            <img src="/assets/payment-seconds.svg" alt="" />
          </StaticIllustration>
        </Reveal>
      </FeatureRow>

      <FeatureRow $reverse>
        <Reveal>
          <FeatureCopy
            title="Spend the money instantly"
            body="Buy a gift card, send the money to someone else or withdraw straight to your bank account. The choice is yours."
          />
        </Reveal>
        <Reveal delay={140}>
          <MediaWrap style={{ maxWidth: 391 }}>
            <img src="/assets/money-instantly.svg" alt="" />
          </MediaWrap>
        </Reveal>
      </FeatureRow>
    </SectionRoot>
  );
}
