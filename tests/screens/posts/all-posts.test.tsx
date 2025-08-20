import { screen } from "@testing-library/react";
import AllPosts from "../../../src/screens/posts/all-posts";
import { renderWithProviders } from "../../test-utils";

describe("AllPosts", () => {
  it("should render the all posts screen", () => {
    renderWithProviders(<AllPosts />);
    expect(
      screen.getByRole("heading", { name: /Todas las publicaciones/i })
    ).toBeInTheDocument();
  });
});
