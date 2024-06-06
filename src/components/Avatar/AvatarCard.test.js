// tests/AvatarCard.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AvatarCard from "./AvatarCard"; // Adjust the import based on your project's structure
import CustomButton from "../../utils/CustomButton";

// Mock the CustomButton component
jest.mock("../../utils/CustomButton", () => ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
));

const mockAvatar = {
  name: "John Doe",
  image: "https://example.com/avatar.jpg",
  skills: [
    { name: "JavaScript", rating: "Expert" },
    { name: "React", rating: "Advanced" },
  ],
};

const mockOnEdit = jest.fn();

describe("Given AvatarCard", () => {
  beforeEach(() => {
    render(<AvatarCard avatar={mockAvatar} onEdit={mockOnEdit} />);
  });

  it("Then renders avatar image", () => {
    const image = screen.getByAltText(mockAvatar.name);
    expect(image).toHaveAttribute("src", mockAvatar.image);
  });

  it("Then renders avatar name", () => {
    const name = screen.getByText(mockAvatar.name);
    expect(name).toBeInTheDocument();
  });

  it("Then renders Edit Profile button and handles click", () => {
    const button = screen.getByText("Edit Profile");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockOnEdit).toHaveBeenCalled();
  });

  it("Then renders skills", () => {
    mockAvatar.skills.forEach((skill, index) => {
      const nameElement = screen.getByTestId(`skill-element-${index}`);
      expect(nameElement).toHaveTextContent(skill.name);
      expect(nameElement).toHaveTextContent(skill.rating);
    });
  });

  it("Then renders skills", () => {
    const skillElements = screen.getAllByTestId(/^skill-element-/);
    expect(skillElements.length).toBe(mockAvatar.skills.length);
  });

  it("Then renders message when no skills are available", () => {
    const avatarWithoutSkills = { ...mockAvatar, skills: [] };
    render(<AvatarCard avatar={avatarWithoutSkills} onEdit={mockOnEdit} />);
    const noSkillsMessage = screen.getByText("No skills to display");
    expect(noSkillsMessage).toBeInTheDocument();
  });
});
