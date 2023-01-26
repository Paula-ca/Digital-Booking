import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ProductUpdated from '../Components/ProductUpdated'


describe("MaProductUpdatedin", () => {
    test("ProductUpdated page exist", () => {
      render(<ProductUpdated />, { wrapper: BrowserRouter });
      expect(screen.getByText(/El producto se ha modificado con éxito/i)).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByRole("link")).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
      
    });
  });