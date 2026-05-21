"use client";

import styled from "styled-components";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button, Container, Heading, Stack, Text } from "@/components/ui";

const Main = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
`;

const NotFoundSection = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.space[14]} 0`};
`;

const NotFoundContainer = styled(Container)`
  max-width: 640px;
`;

export default function NotFound() {
  return (
    <Main>
      <SiteHeader />
      <NotFoundSection>
        <NotFoundContainer>
          <Stack $gap={5} $align="center">
            <Text
              size="lg"
              weight="semibold"
              tone="accent"
              align="center"
              tracking="loose"
            >
              COMING SOON
            </Text>
            <Heading level={2} align="center">
              Not available yet 🛠️
            </Heading>
            <Text size="lg" tone="secondary" align="center" leading="body">
              We&apos;re still building this part of Collctiv. Pop back soon —
              it&apos;ll be ready before you can say &ldquo;split the bill&rdquo;.
            </Text>
            <Button href="/" size="lg" shape="pill" fullWidth={false}>
              Back to home
            </Button>
          </Stack>
        </NotFoundContainer>
      </NotFoundSection>
      <SiteFooter />
    </Main>
  );
}
