import { screen } from "@testing-library/react";
import Home from "../../src/screens/home";
import { renderWithProviders } from "../test-utils";

describe("Home", () => {
  it("should render the home screen", () => {
    renderWithProviders(<Home />);

    expect(
      screen.getByRole("heading", { name: /Programación Frontend/i, level: 2 })
    ).toBeInTheDocument();
  });
});
