"use client";

import styled, { css, keyframes } from "styled-components";
import { Button, Container, Heading, Stack, Text } from "@/components/ui";
import { useInView } from "@/hooks/useInView";
import { SectionRoot } from "./shared";
import { CustomisePotSvg } from "./CustomisePotSvg";

const FeatureRow = styled(Container)<{ $reverse?: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  grid-template-columns: 1fr;
  align-items: center;
  padding: ${({ theme }) => `${theme.space[10]} 0`};

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.space[12]};
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

const ParallaxImage = styled.div<{ $play: boolean; $delay?: number }>`
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(48px);
  transition:
    opacity 0.9s cubic-bezier(0.2, 0.65, 0.2, 1),
    transform 0.9s cubic-bezier(0.2, 0.65, 0.2, 1);
  transition-delay: ${({ $delay = 0 }) => `${$delay}ms`};

  ${({ $play }) =>
    $play &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

const StaticIllustration = styled.div`
  width: 100%;
  max-width: 486px;
  margin: 0 auto;

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
      <Text size="lg" tone="muted" leading="body">
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
  const { ref: bankRef, inView: bankInView } = useInView<HTMLDivElement>(0.25);
  const { ref: spendRef, inView: spendInView } = useInView<HTMLDivElement>(0.25);

  return (
    <SectionRoot>
      <FeatureRow>
        <FeatureCopy
          title="Customise your Pot"
          body="Customise your Pot, send a closing date, show who's paid in already, add a fundraising target, add extra information about the collection, and more."
        />
        <div ref={customiseRef}>
          <PotIllustration $play={customiseInView}>
            <CustomisePotSvg />
          </PotIllustration>
        </div>
      </FeatureRow>

      <FeatureRow $reverse>
        <FeatureCopy
          title="Keep money separate from your bank"
          body="Don't mix group money in with your personal bank account. Keep track of who's paid what and when."
        />
        <div ref={bankRef}>
          <ParallaxImage $play={bankInView}>
            <img src="/assets/separate-from-bank.svg" alt="" />
          </ParallaxImage>
        </div>
      </FeatureRow>

      <FeatureRow>
        <FeatureCopy
          title="Making a payment takes seconds"
          body="Anyone paying into the collection pot just uses their card details or they can use Apple Pay or Google Pay. No need to sign up for an account or download an app, just tap and you're done! The money appears in your pot instantly."
        />
        <StaticIllustration>
          <img src="/assets/payment-seconds.svg" alt="" />
        </StaticIllustration>
      </FeatureRow>

      <FeatureRow $reverse>
        <FeatureCopy
          title="Spend the money instantly"
          body="Buy a gift card, send the money to someone else or withdraw straight to your bank account. The choice is yours."
        />
        <div ref={spendRef}>
          <ParallaxImage $play={spendInView} style={{ maxWidth: 391 }}>
            <img src="/assets/money-instantly.svg" alt="" />
          </ParallaxImage>
        </div>
      </FeatureRow>
    </SectionRoot>
  );
}
