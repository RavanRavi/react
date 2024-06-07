import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SkillTable from "./SkillTable";
import "@testing-library/jest-dom";
import * as avatarSlice from "../../redux/slices/avatarSlice";

import { useTranslation } from "react-i18next";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock("../../redux/slices/avatarSlice", () => ({
  ...jest.requireActual("../../redux/slices/avatarSlice"),
  updateSkill: jest.fn(),
  editSkill: jest.fn(),
}));
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
    avatarSlice?.updateSkill?.mockClear();
    avatarSlice?.editSkill?.mockClear();
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

    const actionButton = screen.getByTestId("skill-actions-button-new-0");
    fireEvent.click(actionButton);

    const deleteButton = screen.getByTestId("skill-new-delete-button-0");
    fireEvent.click(deleteButton);

    expect(setNewSkills).toHaveBeenCalledWith([]);
  });
});
