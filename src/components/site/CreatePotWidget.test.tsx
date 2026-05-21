import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/renderWithProviders";
import { CreatePotWidget } from "./CreatePotWidget";
import { POT_STORAGE_KEY } from "@/types/pot";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn() }),
}));

describe("CreatePotWidget", () => {
  beforeEach(() => {
    pushMock.mockClear();
    window.localStorage.clear();
  });

  it("shows validation errors when category and name are missing", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CreatePotWidget />);

    await user.click(screen.getByRole("button", { name: /create your pot/i }));

    expect(
      await screen.findByText(/please choose a category/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please give your pot a name/i)
    ).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("blocks submission with a category but no name", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CreatePotWidget />);

    await user.click(screen.getByRole("radio", { name: /whip-round for a gift/i }));
    await user.click(screen.getByRole("button", { name: /create your pot/i }));

    expect(
      await screen.findByText(/please give your pot a name/i)
    ).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("sanitises name input by stripping angle brackets and capping length", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CreatePotWidget />);

    const input = screen.getByPlaceholderText(/enter a name for this pot/i);
    const dirty = "<script>" + "a".repeat(80);
    await user.type(input, dirty);

    expect((input as HTMLInputElement).value).not.toContain("<");
    expect((input as HTMLInputElement).value.length).toBeLessThanOrEqual(50);
  });

  it("persists the pot to localStorage and navigates to /app/pot on success", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CreatePotWidget />);

    await user.click(screen.getByRole("radio", { name: /whip-round for a gift/i }));
    await user.type(
      screen.getByPlaceholderText(/enter a name for this pot/i),
      "John's Birthday"
    );
    await user.click(screen.getByRole("button", { name: /create your pot/i }));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/app/pot"));

    const stored = JSON.parse(
      window.localStorage.getItem(POT_STORAGE_KEY) ?? "null"
    );
    expect(stored).toMatchObject({
      name: "John's Birthday",
      categoryId: "gift",
    });
    expect(typeof stored.id).toBe("string");
  });
});
