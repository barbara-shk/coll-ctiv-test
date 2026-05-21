import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { renderWithProviders } from "@/test/renderWithProviders";
import { PotPreview } from "./PotPreview";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

describe("PotPreview", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the pot name passed in", () => {
    renderWithProviders(<PotPreview potName="Sarah's Hen Do" />);
    expect(
      screen.getByRole("heading", { level: 1, name: /sarah's hen do/i })
    ).toBeInTheDocument();
  });

  it("intercepts every primary action with the sign-up modal", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PotPreview potName="Test Pot" />);

    expect(
      screen.queryByRole("dialog", { name: /sign in to start collecting/i })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /collect money/i }));
    expect(
      await screen.findByRole("dialog", { name: /sign in to start collecting/i })
    ).toBeInTheDocument();
  });

  it("can be closed and reopened by another action", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PotPreview potName="Test Pot" />);

    await user.click(screen.getByRole("button", { name: /send money/i }));
    expect(
      await screen.findByRole("dialog", { name: /sign in to start collecting/i })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /close dialog/i })
    );
    await waitForElementToBeRemoved(() =>
      screen.queryByRole("dialog", { name: /sign in to start collecting/i })
    );

    await user.click(screen.getByRole("button", { name: /^email$/i }));
    expect(
      await screen.findByRole("dialog", { name: /sign in to start collecting/i })
    ).toBeInTheDocument();
  });
});
