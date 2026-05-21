"use client";

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

export function PlaneIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M21 11.5L3 4l3.5 7.5L3 19l18-7.5z" />
    </svg>
  );
}

export function GiftIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M3 12h18M12 8v13M7.5 8a2.5 2.5 0 1 1 0-5C12 3 12 8 12 8s0-5 4.5-5a2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

export function MedalIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M6 3l3 6 3-2 3 2 3-6" />
      <circle cx="12" cy="15" r="6" />
      <path d="M10 13.5l2 2 3-3.5" />
    </svg>
  );
}

export function HeartIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21l8.84-8.61a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function CheckIcon({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function PencilIcon({ size = 16, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

export function MailIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function QrIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM18 18h3v3h-3z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M21 11.5a8.38 8.38 0 0 1-12.94 7.07L3 21l2.43-5.06A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}

export function FacebookIcon({ size = 21, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest} viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon({ size = 21, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest} viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37a4 4 0 1 1-7.94 1.18A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function LinkedInIcon({ size = 21, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest} viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function PinterestIcon({ size = 21, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 21l4-9" />
      <path d="M9.5 13.5c.5 1 1.5 1.5 2.5 1.5 2.5 0 4-2 4-4.5C16 8.5 14.5 7 12 7S8 8.5 8 10.5" />
    </svg>
  );
}

export function XIcon({ size = 21, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest} viewBox="0 0 24 24">
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

export function CloseIcon({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function ArrowDownRightIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <line x1="7" y1="7" x2="17" y2="17" />
      <polyline points="17 7 17 17 7 17" />
    </svg>
  );
}

export function PaletteIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2a10 10 0 1 0 10 10c0-1.66-1.34-3-3-3h-1.5a2.5 2.5 0 0 1 0-5H18a4 4 0 0 0-4-4z" />
    </svg>
  );
}

export function DotsIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="5" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function StarIcon({ size = 16, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...rest}
    >
      <path d="M12 2l3 7 7 .8-5.3 4.9 1.6 7-6.3-3.7L5.7 21.7l1.6-7L2 9.8 9 9z" />
    </svg>
  );
}

export function AppleIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...rest}
    >
      <path d="M16.5 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.7-3-2-3.7-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.1 2.5C2 12.4 3.3 17 5 19.5c.8 1.2 1.7 2.6 3 2.6 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.3 3-2.5.9-1.4 1.3-2.7 1.4-2.8-.1-.1-2.6-1-2.6-4.2zM14.2 4.4c.7-.8 1.1-2 1-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.5z" />
    </svg>
  );
}
