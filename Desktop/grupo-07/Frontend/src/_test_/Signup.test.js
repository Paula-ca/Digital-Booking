import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Login from "../Components/Signup";

describe("Signup", () => {
  test("Signup page", () => {
    render(<Login />, { wrapper: BrowserRouter });
   
    expect(screen.getByText(/crear cuenta/i)).toBeInTheDocument()
    expect(screen.getByText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByText(/apellido/i)).toBeInTheDocument()
    expect(screen.getByText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByText(/Confirmar contraseña/i)).toBeInTheDocument()
    expect(screen.getByText(/ingresar/i)).toBeInTheDocument()
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument()

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();

  });
});
