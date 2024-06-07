import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditProfileModal from "./EditProfileModal";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { useTranslation } from "react-i18next";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const mockStore = configureStore([]);

jest.mock("../../utils/CustomButton", () => ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
));

describe("Given EditProfileModal", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      avatars: {
        avatars: [
          {
            id: 1,
            name: "John Doe",
            image: "johnDoeImage.jpg",
            skills: [
              { name: "JavaScript", rating: "Advanced" },
              { name: "React", rating: "Intermediate" },
            ],
          },
        ],
      },
    });
  });

  test("Then renders the modal and its elements correctly", () => {
    render(
      <Provider store={store}>
        <EditProfileModal avatar={store.getState().avatars.avatars[0]} />
      </Provider>
    );

    expect(screen.getByText("Edit Profile")).toBeInTheDocument();

    expect(screen.getByTestId("search-skill-input")).toBeInTheDocument();
    expect(screen.getByTestId("select-skill-rating")).toBeInTheDocument();

    expect(screen.getByTestId("skill-table")).toBeInTheDocument();

    expect(screen.getByTestId("add-skill-button")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
  });

  test("adds a new skill when 'Add Skill' button is clicked", async () => {
    render(
      <Provider store={store}>
        <EditProfileModal avatar={store.getState().avatars.avatars[0]} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("add-skill-button"));
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Rating")).toBeInTheDocument();
  });
});
