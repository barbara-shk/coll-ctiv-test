"use client";

import styled from "styled-components";
import { Container, Logo, Row, Stack, Text } from "@/components/ui";
import {
  InstagramIcon,
  LinkedInIcon,
  PinterestIcon,
} from "@/components/ui/Icon";

const Wrap = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => `${theme.space[12]} 0 ${theme.space[8]}`};
`;

const Inner = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[10]};
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[10]};

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.space[8]};
  }
`;

const ColumnHeading = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.letterSpacings.loose};
  color: ${({ theme }) => theme.palette.slateGray};
  margin: 0 0 ${({ theme }) => theme.space[5]};
  text-transform: uppercase;
`;

const LinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};

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

const BrandColumn = styled(Stack).attrs({ $gap: 5 })`
  align-items: center;
  text-align: center;
  padding-right: 44px;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.subtle};
  transition: color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${({ theme }) => theme.colors.borderInteractive};
  }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0;
`;

const LegalText = styled(Text).attrs({ size: "sm", tone: "muted", align: "center" })`
  max-width: 720px;
  margin: 0 auto;
`;

export function SiteFooter() {
  return (
    <Wrap>
      <Inner>
        <Columns>
          <BrandColumn>
            <Logo />
            <img src="/assets/techstars-logo.png" alt="Techstars" />
            <img
              src="/assets/stars-of-the-workplace-2023.png"
              alt="Winner — Stars of the Workplace 2023"
            />
            <Text size="md" tone="muted">
              Follow us on social
            </Text>
            <Row $gap={2}>
              <SocialLink
                href="https://www.instagram.com/collctiv"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon size={18} />
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/company/collctiv"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon size={18} />
              </SocialLink>
              <SocialLink
                href="https://www.pinterest.com/collctiv"
                aria-label="Pinterest"
                target="_blank"
                rel="noreferrer"
              >
                <PinterestIcon size={18} />
              </SocialLink>
            </Row>
          </BrandColumn>

          <nav aria-label="Navigation">
            <ColumnHeading>Navigation</ColumnHeading>
            <LinkList>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/careers">Careers</a></li>
            </LinkList>
          </nav>

          <nav aria-label="Product">
            <ColumnHeading>Product</ColumnHeading>
            <LinkList>
              <li><a href="/login">Login</a></li>
              <li><a href="https://apps.apple.com" target="_blank" rel="noreferrer">App Store</a></li>
              <li><a href="https://play.google.com" target="_blank" rel="noreferrer">Google Play</a></li>
              <li><a href="/paypal-money-pools">PayPal Money Pools</a></li>
              <li><a href="/sweepstake-generator">Sweepstake Generator</a></li>
              <li><a href="/secret-santa-generator">Secret Santa Generator</a></li>
            </LinkList>
          </nav>

          <nav aria-label="Legal">
            <ColumnHeading>Legal</ColumnHeading>
            <LinkList>
              <li><a href="/terms">Terms &amp; Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </LinkList>
          </nav>
        </Columns>

        <Divider />

        <Stack $gap={1}>
          <LegalText>
            © {new Date().getFullYear()} Collctiv Ltd. All rights reserved.
            Collctiv is a company registered in England and Wales (Company
            number: 11783005)
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
