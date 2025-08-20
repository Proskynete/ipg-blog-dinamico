import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Loading } from "../../src/components/loading.component";
import { renderWithProviders } from "../test-utils";

describe("Loading", () => {
  it("should render the loading spinner and the text", () => {
    renderWithProviders(<Loading />);

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });
});
