import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Main from '../Components/Main'


describe("Main", () => {
    test("Main page exist", () => {
      render(<Main />, { wrapper: BrowserRouter });
      expect(screen.getByText(/Completá los siguientes campos como necesites, y nosotros nos encargamos del resto/i)).toBeInTheDocument();
      expect(screen.getByText(/Usar tu ubicación actual/i)).toBeInTheDocument();
     
      expect(screen.getAllByRole("button")).toBeTruthy();
      
    });
  });