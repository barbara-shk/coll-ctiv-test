"use client";

import type { ElementType, ReactNode } from "react";
import styled, { css } from "styled-components";
import { useInView } from "@/hooks/useInView";

const Wrap = styled.div<{ $play: boolean; $delay: number; $y: number }>`
  opacity: 0;
  transform: translateY(${({ $y }) => $y}px);
  transition:
    opacity 0.8s cubic-bezier(0.2, 0.65, 0.2, 1),
    transform 0.8s cubic-bezier(0.2, 0.65, 0.2, 1);
  transition-delay: ${({ $delay }) => `${$delay}ms`};
  will-change: opacity, transform;

  ${({ $play }) =>
    $play &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  threshold?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  threshold = 0.2,
  as,
  className,
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);
  return (
    <Wrap
      ref={ref}
      as={as}
      className={className}
      style={style}
      $play={inView}
      $delay={delay}
      $y={y}
    >
      {children}
    </Wrap>
  );
}
