"use client";

import styled, { css, keyframes } from "styled-components";
import { Container, Heading, Stack, Text } from "@/components/ui";
import { useInView } from "@/hooks/useInView";
import { SectionRoot } from "./shared";

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
  return (
    <svg
      viewBox="0 0 70 18"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <ellipse cx="35" cy="11" rx="34" ry="6.5" fill="#9D912E" />
      <ellipse cx="35" cy="9" rx="34" ry="6.5" fill="#F3DF43" />
      <ellipse cx="35" cy="9" rx="28" ry="5" fill="#CDBC37" />
      <ellipse cx="35" cy="7.5" rx="18" ry="1.8" fill="#FFF48A" opacity="0.6" />
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

const FallingCoin = styled.span<{
  $play: boolean;
  $left: string;
  $delay: number;
  $size: number;
}>`
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
          <Heading level={2} align="center">
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
