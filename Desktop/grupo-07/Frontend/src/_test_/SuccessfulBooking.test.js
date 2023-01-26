import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import SuccessfulBooking from "../Components/SuccessfulBooking";

describe("SuccessfulBooking", () => {
  test("SuccessfulBooking page", () => {
    render(<SuccessfulBooking />, { wrapper: BrowserRouter });
    expect(
      screen.getByText(/Su reserva se ha realizado con exito/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/¡Muchas Gracias!/i)).toBeInTheDocument();

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
