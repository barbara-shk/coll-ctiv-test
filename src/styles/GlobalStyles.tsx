"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html, body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: ${({ theme }) => theme.fonts.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body { min-height: 100vh; }

  h1, h2, h3, h4, h5, h6, p, figure, blockquote { margin: 0; }

  ul, ol { margin: 0; padding: 0; }

  a { color: inherit; text-decoration: none; }

  button { font-family: inherit; }

  img, svg { display: block; max-width: 100%; }

  input, button, textarea, select { font: inherit; color: inherit; }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brandAccent};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radii.xs};
  }
`;
