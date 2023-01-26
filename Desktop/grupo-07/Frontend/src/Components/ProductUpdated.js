import React from "react";
import { Link } from'react-router-dom'
import checkmark from '../checkmark.png'

import "react-multi-date-picker/styles/colors/teal.css";

const ProductUpdated = () => {
  return (
    <div style={{height: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="bookingCard-container">
      <div style={{ padding: '24px 0 36px 0' }} className="booking-card">
        <img style={{ height: '74px', width: 'auto', objectFit: 'contain', marginBottom: '36px'}} src={checkmark} alt="succesful booking" />
        <h2 style={{marginTop: 0, color: "#383B58"}}>El producto se ha modificado con éxito.</h2>
        <Link to={"/"}>
          <button style={{maxHeight: '54px'}} className="successfulBooking-button">OK</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductUpdated;