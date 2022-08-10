import React from "react";
import { render, screen } from "@testing-library/react";
import StepOne from "./StepOne";
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

test("shuld display correct message about selected days", async () => {
  useContextMock.mockReturnValue({
    formik: {
      values: {
        days: 2,
      },
    },
    formState: states[0],
  });

  const text = "You will stay: 2 days.";

  render(<StepOne />);
  expect(screen.getByText(text)).toBeInTheDocument();
});
