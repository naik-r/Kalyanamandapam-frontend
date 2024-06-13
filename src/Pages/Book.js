import React from "react";
import { Link } from "react-router-dom";

import "./Book.css";

function Booking() {
  return (
    <div>
      <h1><center>Booking</center></h1>
      <div className="booking-container my-5">
        <div className="row">
          <div className="col-md-6 offset-md-3"> {/* Centering the column */}
            <div className="booking-card mb-4 shadow-sm">
              <img src={`${process.env.PUBLIC_URL}/image/gt11.jpg`} className="booking-card-img-top" alt="Img" />
              <div className="booking-card-body">
                <h5 className="booking-card-title">Function Hall Booking</h5>
                <p className="booking-card-text">
                  Enjoy the versatility and elegance of our function hall . Ideal for corporate events, weddings, parties, and more, our spacious and well-appointed hall can accommodate a variety of setups and sizes. With state-of-the-art facilities, customizable seating arrangements, and exceptional service, we ensure your event runs smoothly and impresses your guests. Perfect for gatherings that require overnight stays, focus on your event, not the extras. Book today!
                </p>
                <Link to="/form" style={{textDecoration:'none'}}>
                  <button className="btn btn-primary booking-btn">Book</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
