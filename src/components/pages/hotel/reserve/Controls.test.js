import React from "react";
import { render, screen } from "@testing-library/react";
import Controls from "./Controls";

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

test("test next button hud be enabled at start", async () => {
  useContextMock.mockReturnValue({
    formik: {
      values: {
        payment: "",
      },
    },
    canContinue: false,
  });

  render(<Controls />);
  expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
});

test("next button shuld be enabled after selecting dates", async () => {
  useContextMock.mockReturnValue({
    formik: {
      values: {
        payment: "",
      },
    },
    canContinue: true,
  });

  render(<Controls />);
  expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
});

test("checkout button shuld be disabled if no payment method is selected", () => {
  useContextMock.mockReturnValue({
    formik: {
      values: {
        payment: "",
      },
    },
    canContinue: true,
  });

  render(<Controls />);
  expect(screen.getByRole("button", { name: /Book Now/i })).toBeDisabled();
});

test("checkout button shuld be enable if payment method is selected", () => {
  useContextMock.mockReturnValue({
    formik: {
      values: {
        payment: "paypal",
      },
    },
    canContinue: true,
  });

  render(<Controls />);
  expect(screen.getByRole("button", { name: /Book Now/i })).toBeEnabled();
});
