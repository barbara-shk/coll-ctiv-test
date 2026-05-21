"use client";

import Image from "next/image";
import styled from "styled-components";

const Wrap = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: 0;
`;

const LOGO_VARIANTS = {
  default: { src: "/assets/collctiv-logo-header.svg", aspect: 241 / 50 },
  white: { src: "/assets/collctiv-logo-white.svg", aspect: 201 / 35 },
} as const;

interface LogoProps {
  height?: number;
  variant?: keyof typeof LOGO_VARIANTS;
}

export function Logo({ height = 36, variant = "default" }: LogoProps) {
  const { src, aspect } = LOGO_VARIANTS[variant];
  const width = Math.round(height * aspect);

  return (
    <Wrap aria-label="Collctiv">
      <Image
        src={src}
        alt="Collctiv"
        width={width}
        height={height}
        priority
      />
    </Wrap>
  );
}
