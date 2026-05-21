"use client";

import styled from "styled-components";
import { Container, Heading, Row, Stack, Text } from "@/components/ui";

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

const PhoneCluster = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.space[4]};
`;

const Phone = styled.div<{ $tilt: number }>`
  width: 160px;
  height: 320px;
  border-radius: ${({ theme }) => theme.radii["3xl"]};
  background: ${({ theme }) => theme.colors.surface};
  border: 6px solid ${({ theme }) => theme.palette.portGore};
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
  transform: rotate(${({ $tilt }) => $tilt}deg);
  padding: ${({ theme }) => theme.space[4]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};

  .row {
    height: 12px;
    border-radius: ${({ theme }) => theme.radii.xs};
    background: ${({ theme }) => theme.colors.border};
  }
  .row.purple {
    background: ${({ theme }) => theme.colors.brand};
    opacity: 0.85;
    width: 60%;
  }
  .card {
    margin-top: ${({ theme }) => theme.space[2]};
    background: ${({ theme }) => theme.colors.surfaceTinted};
    border-radius: ${({ theme }) => theme.radii.md};
    height: 56px;
  }
  .cta {
    margin-top: auto;
    background: ${({ theme }) => theme.colors.brandHighlight};
    border-radius: ${({ theme }) => theme.radii.md};
    height: 36px;
  }
`;

export function PurpleStorySection() {
  return (
    <SectionRoot $tone="brand">
      <TwoColumn>
        <Stack $gap={4}>
          <Heading level={2} size="5xl" tone="inverse">
            Organise the things you love with the people you love — without
            getting stuck with the bill.
          </Heading>
          <Text size="lg" tone="inverse" leading="body">
            Stop chasing friends for money. Collect, organise and spend
            together — securely, on any device.
          </Text>
        </Stack>
        <PhoneCluster aria-hidden>
          {[-6, 6].map((tilt) => (
            <Phone key={tilt} $tilt={tilt}>
              <div className="row purple" />
              <div className="row" />
              <div className="card" />
              <div className="row" />
              <div className="cta" />
            </Phone>
          ))}
        </PhoneCluster>
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

const StepIcon = styled.span`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.radii["3xl"]};
  background: ${({ theme }) => theme.colors.surfaceTinted};
  color: ${({ theme }) => theme.colors.text.brand};
  display: grid;
  place-items: center;
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const STEPS = [
  {
    title: "Create your Pot",
    body: "A Collctiv pot has 3 simple steps: choose a category, name it, share it with your people.",
  },
  {
    title: "Invite your people",
    body: "Send a link by email, WhatsApp or social — paying in takes seconds, no app required.",
  },
  {
    title: "Spend the money",
    body: "Move the money to your bank or use the Collctiv card to spend from your pot directly.",
  },
];

export function HowItWorksSection() {
  return (
    <SectionRoot>
      <Container>
        <Stack $gap={3} $align="center">
          <Heading level={2} size="4xl" align="center">
            How does Collctiv work?
          </Heading>
        </Stack>
        <Steps>
          {STEPS.map((step, i) => (
            <Stack key={step.title} as="li" $gap={3} $align="center">
              <StepIcon>{i + 1}</StepIcon>
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
