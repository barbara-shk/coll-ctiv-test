"use client";

import styled from "styled-components";
import { Container, Heading, Stack, Text } from "@/components/ui";
import { SectionRoot } from "./shared";

const TestimonialsGrid = styled.div`
  margin-top: ${({ theme }) => theme.space[9]};
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TestimonialCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii["3xl"]};
  padding: ${({ theme }) => theme.space[6]};
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

const TestimonialHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[3]};
`;

const StoreBadge = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.lg};
  flex-shrink: 0;
`;

const Stars = styled.div`
  font-size: 20px;
  letter-spacing: 2px;
  line-height: 1;
`;

type Store = "app" | "google";

const TESTIMONIALS: Array<{
  name: string;
  store: Store;
  rating: number;
  body: string;
}> = [
  {
    name: "Boss Lady D",
    store: "app",
    rating: 5,
    body: "No more chasing parents for cash, simply pull out the app, scan the code or send the link and couple clicks and payment made.",
  },
  {
    name: "Clare",
    store: "google",
    rating: 5,
    body: "Perfect for a class collection for teacher gifts. Really easy to use & I would definitely recommend.",
  },
  {
    name: "Prudent Ogwutum",
    store: "app",
    rating: 5,
    body: "Brilliant app to help collection of funds for different activities and also helps keep track of money going in and out if its an ongoing collection pool.",
  },
];

const STORE_META: Record<Store, { src: string; alt: string }> = {
  app: { src: "/assets/app-store.png", alt: "App Store review" },
  google: { src: "/assets/google-store.png", alt: "Google Play review" },
};

export function TestimonialsSection() {
  return (
    <SectionRoot>
      <Container>
        <Heading level={2} align="center">
          Our customers love us
        </Heading>
        <TestimonialsGrid>
          {TESTIMONIALS.map((t) => {
            const store = STORE_META[t.store];
            return (
              <TestimonialCard key={t.name}>
                <TestimonialHeader>
                  <Stack $gap={2} $align="flex-start">
                    <Text weight="bold">{t.name}</Text>
                    <Stars aria-label={`${t.rating} out of 5 stars`}>
                      {"⭐".repeat(t.rating)}
                    </Stars>
                  </Stack>
                  <StoreBadge src={store.src} alt={store.alt} />
                </TestimonialHeader>
                <Text size="md" tone="secondary" leading="body">
                  {t.body}
                </Text>
              </TestimonialCard>
            );
          })}
        </TestimonialsGrid>
      </Container>
    </SectionRoot>
  );
}
