"use client";

import styled from "styled-components";
import { Button, Container, Logo, Row } from "@/components/ui";

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
        <Logo />
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
