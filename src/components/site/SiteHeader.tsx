"use client";

import Link from "next/link";
import styled from "styled-components";
import { Button, Container, Logo, Row } from "@/components/ui";

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.sm};

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusBrand};
  }
`;

const Bar = styled.header`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.header};
`;

const Inner = styled(Container)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[4]};
`;

const HideOnMobile = styled.span`
  display: none;
  ${({ theme }) => theme.media.md} {
    display: contents;
  }
`;

interface SiteHeaderProps {
  onCtaClick?: () => void;
}

export function SiteHeader({ onCtaClick }: SiteHeaderProps) {
  return (
    <Bar>
      <Inner>
        <LogoLink href="/" aria-label="Collctiv home">
          <Logo />
        </LogoLink>
        <Row $gap={3} $align="center">
          <Button variant="outline" size="sm" shape="pill">
            Login
          </Button>
          <HideOnMobile>
            <Button
              variant="primary"
              size="sm"
              shape="pill"
              onClick={onCtaClick}
            >
              Collect money now
            </Button>
          </HideOnMobile>
        </Row>
      </Inner>
    </Bar>
  );
}
