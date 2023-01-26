import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Header from '../Components/Header'

describe("Header", () => {
    test("parts header", () => {
      render(<Header />, { wrapper: BrowserRouter });
      expect(screen.getByText(/sentite como en tu hogar/i)).toBeInTheDocument();
      expect(screen.getByText(/registrarse/i)).toBeInTheDocument();

      expect(screen.getByRole("img")).toBeInTheDocument();
      
      
    });
  });