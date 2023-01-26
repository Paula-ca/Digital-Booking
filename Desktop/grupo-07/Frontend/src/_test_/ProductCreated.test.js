import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ProductCreated from "../Components/ProductCreated";

describe("Product created", () => {
  test("product created page", () => {
    render(<ProductCreated />, { wrapper: BrowserRouter });
    expect(
      screen.getByText(/No se han encontrado reservas./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Volver al inicio/i)).toBeInTheDocument();

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
