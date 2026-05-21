import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@/styles/ThemeProvider";
import { PotProvider } from "@/context/PotContext";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PotProvider>{children}</PotProvider>
    </ThemeProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
