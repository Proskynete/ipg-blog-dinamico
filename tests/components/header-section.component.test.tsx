
import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { HeaderSection } from "../../src/components/header-section.component";
import { renderWithProviders } from "../test-utils";

describe("HeaderSection", () => {
  it("should render the title", () => {
    renderWithProviders(<HeaderSection title="Test Title" />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render the actions and call the onClick handler when clicked", () => {
    const onClick = vi.fn();
    const actions = [
      {
        label: "Test Action",
        onClick,
      },
    ];

    renderWithProviders(<HeaderSection title="Test Title" actions={actions} />);

    const action = screen.getByText("Test Action");
    fireEvent.click(action);

    expect(action).toBeInTheDocument();
    expect(onClick).toHaveBeenCalled();
  });
});
