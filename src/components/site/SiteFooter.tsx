"use client";

import styled from "styled-components";
import { Container, Logo, Row, Stack, Text } from "@/components/ui";
import { InstagramIcon } from "@/components/ui/Icon";

const Wrap = styled.footer`
  background: ${({ theme }) => theme.colors.surfaceMuted};
  padding: ${({ theme }) => `${theme.space[11]} 0 ${theme.space[8]}`};
`;

const Inner = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[5]};
  text-align: center;
`;

const Links = styled(Row).attrs({ $gap: 6, as: "nav" })`
  a {
    color: ${({ theme }) => theme.colors.text.muted};
    font-size: ${({ theme }) => theme.fontSizes.md};
    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

const Socials = styled(Row).attrs({ $gap: 4 })`
  color: ${({ theme }) => theme.colors.text.subtle};
`;

const PSymbol = styled.span`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  line-height: 1;
`;

export function SiteFooter() {
  return (
    <Wrap>
      <Inner>
        <Logo />
        <Links>
          <a href="#privacy">Privacy</a>
          <a href="#support">Support</a>
        </Links>
        <Socials>
          <InstagramIcon size={22} />
          <PSymbol aria-hidden>𝓟</PSymbol>
        </Socials>
        <Stack $gap={1}>
          <Text size="sm" tone="muted">
            © {new Date().getFullYear()} Collctiv Ltd. All rights reserved.
          </Text>
          <Text size="sm" tone="muted">
            Collctiv Ltd is a company registered in England and Wales (No.
            11783005)
          </Text>
          <Text size="sm" tone="muted">
            Collctiv Ltd, Colony, 5 Piccadilly Place, Manchester, England, M1
            3BR. VAT number: 348654172
          </Text>
        </Stack>
      </Inner>
    </Wrap>
  );
}
