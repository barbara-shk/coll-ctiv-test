/**
 * Collctiv design tokens.
 *
 * Two layers:
 *  - `palette` / scales: primitive values pulled straight from the Figma
 *    variables (named after their Figma swatches).
 *  - `theme`: semantic aliases that everything else in the app should refer
 *    to (e.g. `theme.colors.text.primary` rather than `palette.ebony`).
 *
 * If you find yourself reaching for a raw hex in a component, add a semantic
 * alias here first.
 */

const palette = {
  // brand
  paua: "#1B0273",
  paua700: "#16025E",
  deepBlue: "#1B0973",
  portGore: "#1E1B4B",
  razzmatazz: "#F2167D",
  razzmatazz700: "#D1136B",
  blueChill: "#0D9BAF",
  blueChill700: "#0A8B9C",
  schoolBusYellow: "#FFDE00",
  schoolBusYellow600: "#FFD400",
  schoolBusYellowTint: "#FFFDF0",
  selectiveYellow: "#F5B400",

  // neutrals
  white: "#FFFFFF",
  black: "#000000",
  ebony: "#0F172A",
  mirage: "#1E2939",
  oxfordBlue: "#323F4B",
  shuttleGray: "#52606D",
  nevada: "#616E7C",
  riverBed: "#4B5563",
  paleSky: "#6B7280",
  slateGray: "#7B8794",
  waterloo: "#798099",
  grayChateau: "#9CA3AF",
  silverChalice: "#9E9E9E",
  athensGray: "#E6E8F0",
  athensGray2: "#E5E7EB",
  selago: "#E9E8FC",
  whisper: "#F8F7FA",
  grey94: "#ECECF1",
  grey98: "#F9FAFB",
} as const;

const fontFamilies = {
  body: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  display: '"Inter", system-ui, -apple-system, sans-serif',
  secondary: '"Montserrat", system-ui, sans-serif',
} as const;

const fontSizes = {
  xs: "12px",
  sm: "13px",
  md: "14px",
  base: "15px",
  lg: "16px",
  xl: "18px",
  "2xl": "20px",
  "3xl": "24px",
  "4xl": "30px",
  "5xl": "36px",
  "6xl": "44px",
  "7xl": "52px",
  "8xl": "64px",
  "9xl": "80px",
} as const;

const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

const lineHeights = {
  tight: 1.05,
  snug: 1.2,
  base: 1.4,
  body: 1.55,
  loose: 1.7,
  heading: 1.275,
  relaxed: 1.5,
} as const;

const letterSpacings = {
  tight: "-0.96px",
  snugger: "-0.5px",
  snug: "-0.4px",
  normal: "0",
  loose: "0.7px",
} as const;

const space = {
  0: "0",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "40px",
  10: "48px",
  11: "56px",
  12: "64px",
  13: "72px",
  14: "80px",
  15: "96px",
  16: "120px",
} as const;

const radii = {
  none: "0",
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "10px",
  xl: "12px",
  "2xl": "14px",
  "3xl": "16px",
  pill: "999px",
} as const;

const sizes = {
  control: {
    sm: "36px",
    md: "44px",
    lg: "48px",
    xl: "52px",
  },
} as const;

const shadows = {
  none: "none",
  sm: "0 1px 2px rgba(15, 23, 42, 0.06)",
  md: "0 4px 12px rgba(15, 23, 42, 0.08)",
  lg: "0 12px 32px rgba(15, 23, 42, 0.12)",
  card: "0 8px 24px rgba(27, 2, 115, 0.08)",
  cardElevated: "0 10px 32px rgba(15, 23, 42, 0.12)",
  hero: "0 24px 60px rgba(27, 2, 115, 0.18)",
  focusBrand: "0 0 0 3px rgba(27, 2, 115, 0.12)",
  focusDanger: "0 0 0 3px rgba(242, 22, 125, 0.12)",
  focusAccent: "0 0 0 3px rgba(255, 222, 0, 0.25)",
} as const;

const transitions = {
  fast: "0.12s ease",
  base: "0.18s ease",
  slow: "0.3s ease",
  easeOut: "cubic-bezier(0.2, 0.8, 0.2, 1)",
} as const;

const zIndices = {
  hide: -1,
  base: 0,
  raised: 1,
  sticky: 10,
  header: 20,
  overlay: 90,
  modal: 100,
  toast: 110,
} as const;

const breakpoints = {
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  maxMd: "@media (max-width: 767px)",
} as const;

const layout = {
  maxWidth: "1200px",
  pagePadding: space[5],
} as const;

export const theme = {
  palette,
  colors: {
    // ----- brand surfaces -----
    brand: palette.paua,
    brandStrong: palette.paua700,
    brandTint: palette.selago,
    brandAccent: palette.razzmatazz,
    brandAccentStrong: palette.razzmatazz700,
    brandSecondary: palette.blueChill,
    brandSecondaryStrong: palette.blueChill700,
    brandHighlight: palette.schoolBusYellow,
    brandHighlightStrong: palette.schoolBusYellow600,
    brandHighlightTint: palette.schoolBusYellowTint,
    starGold: palette.selectiveYellow,

    // ----- surfaces -----
    surface: palette.white,
    surfaceMuted: palette.grey98,
    surfaceSubtle: palette.whisper,
    surfaceTinted: palette.selago,
    surfaceInverse: palette.paua,

    // ----- borders -----
    border: palette.athensGray2,
    borderStrong: palette.athensGray,
    borderInteractive: palette.grayChateau,

    // ----- text -----
    text: {
      primary: palette.portGore,
      heading: palette.oxfordBlue,
      secondary: palette.riverBed,
      muted: palette.paleSky,
      subtle: palette.grayChateau,
      inverse: palette.white,
      brand: palette.paua,
      onAccent: palette.white,
    },

    // ----- feedback -----
    danger: palette.razzmatazz,
    success: palette.blueChill,

    // exposed for SVG decoration, illustrations, etc.
    white: palette.white,
    black: palette.black,
  },
  fonts: fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  space,
  radii,
  sizes,
  shadows,
  transitions,
  zIndices,
  breakpoints,
  media,
  layout,
} as const;

export type AppTheme = typeof theme;
