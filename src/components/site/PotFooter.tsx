"use client";

import styled from "styled-components";
import { Container, Row, Stack, Text } from "@/components/ui";
import { InstagramIcon, PinterestIcon } from "@/components/ui/Icon";

const Wrap = styled.footer`
  background: ${({ theme }) => theme.colors.surfaceMuted};
  padding: ${({ theme }) => `${theme.space[8]} 0 ${theme.space[8]}`};
`;

const Inner = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[5]};
`;

const Links = styled(Row).attrs({ $gap: 6, $justify: "center" })`
  a {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.base};

    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

const SocialRow = styled(Row).attrs({ $gap: 4, $justify: "center" })`
  color: ${({ theme }) => theme.colors.text.subtle};

  a {
    display: inline-flex;
    color: inherit;
    transition: color ${({ theme }) => theme.transitions.base};

    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

const LegalText = styled(Text).attrs({ size: "sm", tone: "muted", align: "center" })`
  max-width: 720px;
  margin: 0 auto;
`;

export function PotFooter() {
  return (
    <Wrap>
      <Inner>
        <Links as="nav" aria-label="Footer">
          <a href="/privacy">Privacy</a>
          <a href="/support">Support</a>
        </Links>

        <SocialRow>
          <a
            href="https://www.instagram.com/collctiv"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon size={20} />
          </a>
          <a
            href="https://www.pinterest.com/collctiv"
            aria-label="Pinterest"
            target="_blank"
            rel="noreferrer"
          >
            <PinterestIcon size={20} />
          </a>
        </SocialRow>

        <Stack $gap={1}>
          <LegalText>
            © {new Date().getFullYear()} Collctiv Ltd. All rights reserved.
          </LegalText>
          <LegalText> 
            Collctiv Ltd is a company registered in England and Wales (No. 11783005)
          </LegalText>
          <LegalText>
            Collctiv Ltd, Colony, 5 Piccadilly Place, Manchester, England, M1
            3BR. VAT number: 348654172
          </LegalText>
        </Stack>
      </Inner>
    </Wrap>
  );
}
