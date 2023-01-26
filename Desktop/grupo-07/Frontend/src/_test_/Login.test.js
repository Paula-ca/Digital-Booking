import React, { useContext, useState } from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, Simulate } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";
import Login from "../Components/Login";


describe("Login", () => {
  test("Login exist", () => {
    render(<Login />, { wrapper: BrowserRouter });
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
  });
});

// describe("user is logged in", () => {
//   // const navigate = useNavigate()
//   const [email, setEmail] = useState("email");
//   const [password, setPassword] = useState("password");

//   const emailMocked = "matias@gmail.com";
//   const passMocked = "Admin123";

//   setEmail(emailMocked)
//   setPassword(passMocked)
//   const mockNavigate = jest.fn();
//   jest.mock("react-router-dom", () => ({
//     navigate: mockNavigate,
//   }));
//   it("is enabled", () => {
//     it("handles login on click", () => {
//       const { utils } = render(<Login />);
//       Simulate.click(utils(/login/i));

//       expect(mockNavigate).toHaveBeenCalledWith("../");
//     });
//   });
// });
