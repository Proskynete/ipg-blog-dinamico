import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { Card } from "../../src/components/card.component";
import { renderWithProviders } from "../test-utils";
import { BrowserRouter } from "react-router";
import type { Post } from "../../src/modules/post/domain/post.domain";
import { Timestamp } from "firebase/firestore";

const mockPost: Post = {
  id: "1",
  bellowTo: "111",
  title: "Test Post",
  excerpt: "Test Excerpt",
  image: "https://via.placeholder.com/150",
  category: "Test Category",
  date: Timestamp.fromDate(new Date("2023-03-15")),
  createdAt: Timestamp.fromDate(new Date("2023-03-15")),
  slug: "test-post",
  readTime: 5,
  isActive: true,
  content: "test content",
};

describe("Card", () => {
  it("should render the card with the correct data", () => {
    renderWithProviders(
      <BrowserRouter>
        <Card {...mockPost} />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Test Excerpt")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("14 de marzo de 2023")).toBeInTheDocument();
    expect(screen.getByText("5 min. de lectura")).toBeInTheDocument();
  });

  it('should show the "Visible" badge when the post is active', () => {
    renderWithProviders(
      <BrowserRouter>
        <Card {...mockPost} isActive={true} toggleAction={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText("Visible")).toBeInTheDocument();
  });

  it('should show the "Oculto" badge when the post is not active', () => {
    renderWithProviders(
      <BrowserRouter>
        <Card {...mockPost} isActive={false} toggleAction={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText("Oculto")).toBeInTheDocument();
  });

  it("should call the toggleAction when the toggle is clicked", () => {
    const toggleAction = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <Card {...mockPost} toggleAction={toggleAction} />
      </BrowserRouter>
    );

    const toggle = screen.getByRole("checkbox");
    fireEvent.click(toggle);

    expect(toggleAction).toHaveBeenCalled();
  });
});
