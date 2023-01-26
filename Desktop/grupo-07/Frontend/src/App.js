import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import UserProvider from "./Components/UserProvider";
import BurgerMenu from "./Components/BurgerMenu";
import ProductDetail from "./Components/ProductDetail";
import Reservation from "./Components/Reservation";
import SuccessfulBooking from "./Components/SuccessfulBooking";
import ProductCreated from "./Components/ProductCreated"
import ProductUpdated from "./Components/ProductUpdated"
import Administration from "./Components/Administration"
import UserReservation from "./Components/UserReservation";

export const BasicLayout = (_) => {
  return (
    <>
      <BurgerMenu classname="burger-menu" />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/reservation/:productId" element={<Reservation />} />
            <Route path="/successfulBooking" element={<SuccessfulBooking />} />
            <Route path="/productCreated" element={<ProductCreated />} />
            <Route path="/productUpdated" element={<ProductUpdated />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/my-reservations" element={<UserReservation />} />
            <Route path="*" element={<div>Error 404</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

