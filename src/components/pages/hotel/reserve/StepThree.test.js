import React from "react";
import { render, screen } from "@testing-library/react";
import StepThree from "./StepThree";
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

test("shuld display correct message about selected rooms", async () => {
  useContextMock.mockReturnValue({
    formik: {
      values: {
        payment: "ccard",
        rooms: ["101", "102"],
      },
    },
    formState: states[2],
  });

  const text = "101, 102";

  render(<StepThree />);
  expect(screen.getByText(text)).toBeInTheDocument();
});

test("shuld display correct message about total price", async () => {
  useContextMock.mockReturnValue({
    formik: {
      values: {
        payment: "ccard",
        rooms: ["101", "102"],
      },
    },
    formState: states[2],
    totalPrice: 100,
  });

  const text = "100";

  render(<StepThree />);
  expect(screen.getByText(text)).toBeInTheDocument();
});

test("shuld display correct message about selected dates", async () => {
  useContextMock.mockReturnValue({
    formik: {
      values: {
        payment: "ccard",
        rooms: ["101", "102"],
        arrive: "2022-09-01",
        leave: "2022-09-03",
      },
    },
    formState: states[2],
  });

  const arrive = "2022-09-01";
  const leave = "2022-09-03";

  render(<StepThree />);
  expect(screen.getByText(arrive)).toBeInTheDocument();
  expect(screen.getByText(leave)).toBeInTheDocument();
});
