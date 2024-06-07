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
    avatarSlice.deleteSkill.mockImplementation((index) => {});

    render(
      <Provider store={store}>
        <SkillTable
          skills={filteredSkills}
          onSkillChange={jest.fn()}
          onSkillBlur={jest.fn()}
          onSkillDelete={avatarSlice.deleteSkill}
          onSkillEditToggle={jest.fn()}
        />
      </Provider>
    );

    const moreVertButton = screen.getAllByTestId("skill-actions-button-0")[0];
    fireEvent.click(moreVertButton);

    const deleteButton = screen.getByRole("menuitem", { name: /Delete/ });
    fireEvent.click(deleteButton);

    expect(avatarSlice.deleteSkill).toHaveBeenCalledTimes(1);
  });

  test("opens menu and edits a skill", () => {
    avatarSlice.editSkill.mockImplementation((index) => {});

    render(
      <Provider store={store}>
        <SkillTable
          skills={filteredSkills}
          onSkillChange={jest.fn()}
          onSkillBlur={jest.fn()}
          onSkillDelete={jest.fn()}
          onSkillEditToggle={avatarSlice.editSkill}
        />
      </Provider>
    );

    const moreVertButton = screen.getAllByTestId("skill-actions-button-0")[0];
    fireEvent.click(moreVertButton);

    const editButton = screen.getByRole("menuitem", { name: /Edit/ });
    fireEvent.click(editButton);

    expect(avatarSlice.editSkill).toHaveBeenCalledTimes(1);
  });
});
