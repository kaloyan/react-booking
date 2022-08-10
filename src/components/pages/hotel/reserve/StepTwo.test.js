import React from "react";
import { render, screen } from "@testing-library/react";
import StepTwo from "./StepTwo";
import states from "./states.json";

let realUseContext;
let useContextMock;
// Setup mock
beforeEach(() => {
  realUseContext = React.useContext;
  useContextMock = React.useContext = jest.fn();
});
// Cleanup mock
afterEach(() => {
  React.useContext = realUseContext;
});

test("shuld disable next button if rooms are not seleted", async () => {
  useContextMock.mockReturnValue({
    formik: {
      values: {
        rooms: [],
      },
    },
    formState: states[1],
  });

  const text = "Select your rooms";

  render(<StepTwo />);
  expect(screen.getByText(text)).toBeInTheDocument();
});
