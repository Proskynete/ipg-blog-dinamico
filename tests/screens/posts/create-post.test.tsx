import { screen } from "@testing-library/react";
import CreatePost from "../../../src/screens/posts/create-post";
import { renderWithProviders } from "../../test-utils";
import { useAuth } from "../../../src/modules/auth/infrastructure/ui/hooks/useAuth";
import { vi } from "vitest";
import { useNavigate } from "react-router";

vi.mock("../../../src/modules/auth/infrastructure/ui/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));

describe("CreatePost", () => {
  const navigate = vi.fn();
  (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
    navigate
  );

  it("should render the create post screen", () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: {
        state: "SIGNED_IN",
        currentUser: {
          uid: "123",
        },
      },
    });

    renderWithProviders(<CreatePost />);

    expect(
      screen.getByRole("heading", { name: /Crear nuevo artículo/i })
    ).toBeInTheDocument();
  });
});
