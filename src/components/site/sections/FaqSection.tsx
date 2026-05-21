"use client";

import styled from "styled-components";
import { Container, Heading, Stack } from "@/components/ui";
import { SectionRoot } from "./shared";
import { FAQ_ITEMS } from "./faqContent";

const FaqContainer = styled(Container)`
  max-width: 880px;
`;

const FaqList = styled(Stack)`
  margin-top: ${({ theme }) => theme.space[10]};
`;

export function FaqSection() {
  return (
    <SectionRoot>
      <FaqContainer>
        <Heading level={2} align="center">
          Have any questions?
        </Heading>
        <FaqList $gap={9}>
          {FAQ_ITEMS.map((item) => (
            <Stack key={item.question} $gap={3}>
              <Heading level={4}>{item.question}</Heading>
              {item.body}
            </Stack>
          ))}
        </FaqList>
      </FaqContainer>
    </SectionRoot>
  );
}
