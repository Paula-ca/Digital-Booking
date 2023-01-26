import React from "react";
import { Link } from'react-router-dom'
import checkmark from '../checkmark.png'

import "react-multi-date-picker/styles/colors/teal.css";

const SuccessfulBooking = () => {
  return (
    <div style={{height: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="bookingCard-container">
      <div className="booking-card">
        <img style={{ height: '74px', width: 'auto', objectFit: 'contain'}} src={checkmark} alt="succesful booking" />
        <h1 style={{marginBottom: 0, color: "#1DBEB4"}}>¡Muchas Gracias!</h1>
        <h2 style={{marginTop: 0, color: "#383B58"}}>Su reserva se ha realizado con exito</h2>
        <Link to={"/"}>
          <button style={{maxHeight: '54px'}} className="successfulBooking-button">OK</button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulBooking;
