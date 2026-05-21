"use client";

import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Button, Container, Heading, Row, Stack, Text } from "@/components/ui";
import Link from "next/link";

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* -------------------------------------------------------------------------- */
/* Section helpers                                                            */
/* -------------------------------------------------------------------------- */

const SectionRoot = styled.section<{ $tone?: "default" | "muted" | "brand" }>`
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

/* -------------------------------------------------------------------------- */
/* Purple story                                                               */
/* -------------------------------------------------------------------------- */

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
          <Heading level={2} size="5xl" tone="inverse">
            Organise the things you love with the people you love — without
            getting stuck with the bill.
          </Heading>
          <Text size="lg" tone="inverse" leading="body">
            We know it can be super awkward (and frustrating!) chasing people down
for money, so we've made it easy to collect money from groups of people.
Here's how:
          </Text>
          <Text size="lg" tone="inverse" leading="body">
            1) You request money from friends by sending them a custom payment link
or QR code.
          </Text>
          <Text size="lg" tone="inverse" leading="body">
            2) They use Apple Pay, Google Pay or their digital wallet to pay you (no
bank details, account creation, or app download required).
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

/* -------------------------------------------------------------------------- */
/* How it works                                                               */
/* -------------------------------------------------------------------------- */

const Steps = styled.ol`
  margin: ${({ theme }) => theme.space[9]} 0 0;
  list-style: none;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.space[6]};
  }
`;

const StepImage = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    object-fit: contain;
  }
`;

// The C-shape in create-pot.svg has its tips at ~20° and ~340° (measured
// clockwise from 12 o'clock), so the sweep starts at the right tip and
// spans 320° clockwise around to the left tip.
const ClockSweepImage = styled.img<{ $play: boolean }>`
  -webkit-mask-image: conic-gradient(
    from 20deg,
    #000 var(--sweep),
    transparent var(--sweep) 360deg
  );
  mask-image: conic-gradient(
    from 20deg,
    #000 var(--sweep),
    transparent var(--sweep) 360deg
  );
  transition: --sweep 1.6s cubic-bezier(0.4, 0, 0.2, 1);
  --sweep: ${({ $play }) => ($play ? "320deg" : "0deg")};

  @media (prefers-reduced-motion: reduce) {
    --sweep: 320deg;
    transition: none;
  }
`;

function CoinShape() {
  // Mirrors the coin-top shapes used in spend-money.svg: dark base ring,
  // yellow top, darker inner disc, and a soft highlight.
  return (
    <svg
      viewBox="0 0 70 18"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <ellipse cx="35" cy="11" rx="34" ry="6.5" fill="#9D912E" />
      <ellipse cx="35" cy="9" rx="34" ry="6.5" fill="#F3DF43" />
      <ellipse cx="35" cy="9" rx="28" ry="5" fill="#CDBC37" />
      <ellipse
        cx="35"
        cy="7.5"
        rx="18"
        ry="1.8"
        fill="#FFF48A"
        opacity="0.6"
      />
    </svg>
  );
}

// Wraps the spend-money image at its intrinsic 197×150 size so the
// falling coins can be positioned in the same coordinate system as the
// stacks inside the SVG. The image sits on z-index 2 so coins disappear
// behind it as they fall into the pile.
const CoinPile = styled.div`
  position: relative;
  width: 197px;
  max-width: 100%;

  img {
    display: block;
    width: 100%;
    height: auto;
    position: relative;
    z-index: 2;
  }
`;

const coinFall = keyframes`
  0%   { transform: translate(-50%, -50px); opacity: 0; }
  15%  { opacity: 1; }
  100% { transform: translate(-50%, 105px); opacity: 1; }
`;

const FallingCoin = styled.span<{ $play: boolean; $left: string; $delay: number; $size: number }>`
  position: absolute;
  top: 0;
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size}px;
  height: auto;
  transform: translate(-50%, -50px);
  opacity: 0;
  pointer-events: none;
  z-index: 1;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  ${({ $play, $delay }) =>
    $play &&
    css`
      animation: ${coinFall} 1.2s ${$delay}ms cubic-bezier(0.55, 0, 0.75, 0.2) forwards;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const STEPS = [
  {
    title: "Create your Pot",
    body: "Collection pots are free, create as many as you want, it only takes a couple of seconds.",
    image: "/assets/create-pot.svg",
    animation: "clock" as const,
  },
  {
    title: "Share the Pot link",
    body: "Share the link on WhatsApp, Messenger, email, a website, SMS, basically anywhere you like.",
    image: "/assets/share-pot.png",
    animation: "none" as const,
  },
  {
    title: "Spend the money",
    body: "Buy a gift card, send on to someone else or withdraw to your bank account.",
    image: "/assets/spend-money.svg",
    animation: "coins" as const,
  },
];

// Percentages match stack centers in spend-money.svg (197px viewBox).
// Left stack ≈ x:37 (19%), right stack ≈ x:162 (82%).
const FALLING_COINS = [
  { left: "19%", delay: 0, size: 55 },
  { left: "82%", delay: 500, size: 50 },
  { left: "19%", delay: 1000, size: 48 },
];

export function HowItWorksSection() {
  const { ref, inView } = useInView<HTMLOListElement>(0.25);

  return (
    <SectionRoot>
      <Container>
        <Stack $gap={3} $align="center">
          <Heading level={2} size="4xl" align="center">
            How does Collctiv work?
          </Heading>
        </Stack>
        <Steps ref={ref}>
          {STEPS.map((step) => (
            <Stack key={step.title} as="li" $gap={3} $align="center">
              <StepImage aria-hidden>
                {step.animation === "clock" && (
                  <ClockSweepImage src={step.image} alt="" $play={inView} />
                )}
                {step.animation === "coins" && (
                  <CoinPile>
                    <img src={step.image} alt="" />
                    {FALLING_COINS.map((coin, i) => (
                      <FallingCoin
                        key={i}
                        $play={inView}
                        $left={coin.left}
                        $delay={coin.delay}
                        $size={coin.size}
                      >
                        <CoinShape />
                      </FallingCoin>
                    ))}
                  </CoinPile>
                )}
                {step.animation === "none" && <img src={step.image} alt="" />}
              </StepImage>
              <Heading level={5} align="center">
                {step.title}
              </Heading>
              <Text size="md" tone="muted" align="center" leading="body">
                {step.body}
              </Text>
            </Stack>
          ))}
        </Steps>
      </Container>
    </SectionRoot>
  );
}

/* -------------------------------------------------------------------------- */
/* Payments                                                                   */
/* -------------------------------------------------------------------------- */

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  height: 40px;
  padding: 0 ${({ theme }) => theme.space[4]};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const PAYMENTS = ["VISA", "Mastercard", "AMEX", "G Pay", " Pay"];

export function PaymentsSection() {
  return (
    <SectionRoot $tone="muted">
      <Container>
        <Stack $gap={2} $align="center">
          <Heading level={3} align="center">
            Making a payment takes seconds
          </Heading>
          <Text size="md" tone="muted" align="center">
            Anyone paying in can use the cards and pay-by-bank methods they
            already trust.
          </Text>
        </Stack>
        <Row
          $gap={4}
          $wrap
          $justify="center"
          $align="center"
          style={{ marginTop: 24 }}
        >
          {PAYMENTS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </Row>
      </Container>
    </SectionRoot>
  );
}

/* -------------------------------------------------------------------------- */
/* Stats banner                                                               */
/* -------------------------------------------------------------------------- */

const StatGrid = styled.div`
  margin-top: ${({ theme }) => theme.space[6]};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => `${theme.space[7]} ${theme.space[4]}`};

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
    <SectionRoot $tone="brand">
      <Container>
        <Heading level={3} tone="inverse" align="center">
          You&apos;re in great company 🎉
        </Heading>
        <StatGrid>
          {STATS.map((s) => (
            <Stack key={s.label} $gap={1} $align="center">
              <Heading level={2} size="6xl" tone="inverse" align="center">
                {s.num}
              </Heading>
              <Text size="md" tone="inverse">
                {s.label}
              </Text>
            </Stack>
          ))}
        </StatGrid>
      </Container>
    </SectionRoot>
  );
}
