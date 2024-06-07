import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SkillTable from "./SkillTable";
import "@testing-library/jest-dom";
import * as avatarSlice from "../../redux/slices/avatarSlice";

jest.mock("../../redux/slices/avatarSlice", () => ({
  ...jest.requireActual("../../redux/slices/avatarSlice"),
  updateSkill: jest.fn(),
  editSkill: jest.fn(),
  deleteSkill: jest.fn(),
}));

const mockStore = configureStore([]);

describe("SkillTable component", () => {
  let store;
  let filteredSkills;

  beforeEach(() => {
    store = mockStore({
      avatar: {
        skills: [
          { name: "JavaScript", rating: "Advanced", editing: false },
          { name: "React", rating: "Intermediate", editing: false },
        ],
      },
    });

    filteredSkills = [
      { name: "JavaScript", rating: "Advanced", editing: false },
      { name: "React", rating: "Intermediate", editing: false },
    ];

    avatarSlice.updateSkill.mockClear();
    avatarSlice.editSkill.mockClear();
    avatarSlice.deleteSkill.mockClear();
  });

  test("renders existing skills correctly", () => {
    render(
      <Provider store={store}>
        <SkillTable
          skills={filteredSkills}
          onSkillChange={jest.fn()}
          onSkillBlur={jest.fn()}
          onSkillDelete={jest.fn()}
          onSkillEditToggle={jest.fn()}
        />
      </Provider>
    );
    expect(screen.getByDisplayValue("JavaScript")).toBeInTheDocument();
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });

  test("opens menu and deletes a skill", () => {
    // Mock avatarSlice.deleteSkill
    avatarSlice.deleteSkill.mockImplementation((index) => {
      // Mock implementation of deleteSkill, can be empty as we are just testing the invocation
    });

    render(
      <Provider store={store}>
        <SkillTable
          skills={filteredSkills}
          onSkillChange={jest.fn()}
          onSkillBlur={jest.fn()}
          onSkillDelete={avatarSlice.deleteSkill} // Pass the mock function directly
          onSkillEditToggle={jest.fn()}
        />
      </Provider>
    );

    // Find the MoreVert icon button and click it to open the menu
    const moreVertButton = screen.getAllByTestId("skill-actions-button-0")[0];
    fireEvent.click(moreVertButton);

    // Find the delete option in the menu and click it
    const deleteButton = screen.getByRole("menuitem", { name: /Delete/ });
    fireEvent.click(deleteButton);

    // Check if onSkillDelete has been called
    expect(avatarSlice.deleteSkill).toHaveBeenCalledTimes(1);
  });
});
