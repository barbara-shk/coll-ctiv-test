"use client";

import Image from "next/image";
import styled from "styled-components";

const Wrap = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: 0;
`;

const LOGO_ASPECT = 241 / 50;

interface LogoProps {
  height?: number;
}

export function Logo({ height = 36 }: LogoProps) {
  const width = Math.round(height * LOGO_ASPECT);

  return (
    <Wrap aria-label="Collctiv">
      <Image
        src="/assets/collctiv-logo-header.svg"
        alt="Collctiv"
        width={width}
        height={height}
        priority
      />
    </Wrap>
  );
}
