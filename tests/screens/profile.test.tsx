import { screen } from "@testing-library/react";
import Profile from "../../src/screens/profile";
import { renderWithProviders } from "../test-utils";
import { useAuth } from "../../src/modules/auth/infrastructure/ui/hooks/useAuth";
import { vi } from "vitest";

vi.mock("../../src/modules/auth/infrastructure/ui/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));

describe("Profile", () => {
  it("should render the profile screen", () => {
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: {
        state: "SIGNED_IN",
        currentUser: {
          uid: "123",
          displayName: "Test User",
          email: "test@example.com",
          photoURL: "",
          metadata: {
            creationTime: new Date().toISOString(),
          },
        },
      },
    });

    renderWithProviders(<Profile />);

    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
  });
});
