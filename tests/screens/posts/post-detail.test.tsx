import { screen } from "@testing-library/react";
import PostDetail from "../../../src/screens/posts/post-detail";
import { renderWithProviders } from "../../test-utils";
import { vi } from "vitest";
import * as ReactRouter from "react-router";

vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  useParams: vi.fn(),
}));

describe("PostDetail", () => {
  it("should render the post detail screen", () => {
    vi.spyOn(ReactRouter, "useParams").mockReturnValue({ slug: "test-post" });

    renderWithProviders(<PostDetail />);

    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });
});
