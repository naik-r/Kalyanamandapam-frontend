import React from "react";
import { Link } from "react-router-dom";

import "./Book.css";

function BookingPage() {
  return (
    <div id="book-page">
    <br></br>
    <h1 className="book"><center>Booking</center></h1>
    <div className="booking-container my-5">
      <div className="row">
        <div className="col-md-6">
          <div className="booking-card mb-4 shadow-sm">
            <img src={`${process.env.PUBLIC_URL}/image/gt11.jpg`} className="booking-card-img-top" alt="Img" />
            <div className="booking-card-body">
              <h5 className="booking-card-title">Function Hall </h5>
              <p className="booking-card-text">
                Enjoy the versatility and elegance of our function hall without the need to book accompanying rooms. Ideal for corporate events, weddings, parties, and more, our spacious and well-appointed hall can accommodate a variety of setups and sizes. With state-of-the-art facilities, customizable seating arrangements, and exceptional service, we ensure your event runs smoothly and impresses your guests. Perfect for gatherings that don't require overnight stays, focus on your event, not the extras. Book today!
              </p>
              <Link to="/form"  style={{textDecoration:'none'}}>
                <button className="btn btn-primary booking-btn">Book</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="booking-card mb-4 shadow-sm">
            <img src={`${process.env.PUBLIC_URL}/image/gt25.jpg`} className="booking-card-img-top" alt="Img" />
            <div className="booking-card-body">
              <h5 className="booking-card-title">Rooms </h5>
              <p className="booking-card-text">
                Enhance your event experience by booking our function hall along with luxurious rooms for your guests. Perfect for weddings, conferences, and multi-day events, this option offers convenience and comfort under one roof. Our elegant function hall is complemented by well-appointed rooms, ensuring your guests can relax and rejuvenate without leaving the venue. Secure this comprehensive package today for an unforgettable and stress-free celebration. Book today!
              </p>
              <Link to="/bookroom"  style={{textDecoration:'none'}}>
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

export default BookingPage;
