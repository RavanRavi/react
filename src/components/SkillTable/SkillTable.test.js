import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SkillTable from "./SkillTable";
import "@testing-library/jest-dom";
import { deleteSkill, updateSkill } from "../../redux/slices/avatarSlice";

jest.mock("../../redux/slices/avatarSlice");

const mockStore = configureStore([]);

describe("SkillTable component", () => {
  let store;
  let filteredSkills;
  let newSkills;
  let setNewSkills;

  beforeEach(() => {
    store = mockStore({
      avatar: {
        skills: [
          { name: "JavaScript", rating: "Advanced" },
          { name: "React", rating: "Intermediate" },
        ],
      },
    });

    filteredSkills = [
      { name: "JavaScript", rating: "Advanced", editing: false },
      { name: "React", rating: "Intermediate", editing: false },
    ];

    newSkills = [{ name: "", rating: "", editing: false }];

    setNewSkills = jest.fn();
  });

  test("renders existing skills correctly", () => {
    render(
      <Provider store={store}>
        <SkillTable
          avatarId={123}
          filteredSkills={filteredSkills}
          newSkills={newSkills}
          setNewSkills={setNewSkills}
        />
      </Provider>
    );
    expect(screen.getByDisplayValue("JavaScript")).toBeInTheDocument();
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });

  test("opens menu and deletes a new skill", () => {
    render(
      <Provider store={store}>
        <SkillTable
          avatarId={123}
          filteredSkills={filteredSkills}
          newSkills={newSkills}
          setNewSkills={setNewSkills}
        />
      </Provider>
    );

    const actionButton = screen.getAllByTestId(/^skill-actions-button-/)[2];
    fireEvent.click(actionButton);

    const deleteButton = screen.getByTestId("skill-actions-delete-new-0");
    fireEvent.click(deleteButton);

    expect(setNewSkills).toHaveBeenCalledWith([]);
  });
});
