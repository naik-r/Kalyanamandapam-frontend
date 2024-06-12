
import React from 'react';
import './Payment.css'; // You can define your CSS styles for animation here

const Payment = () => {
  return (
    <div className="thank-you-container">
      <div className="content-box">
        <div className="animated-box">
          <div className="thank-you-content">
            <h1 className="thank-you-heading" color="#7CFC00">Your Booking for Gangaaram Function Hall is Successful</h1>
            <p className="thank-you-text">We appreciate your business and look forward to hosting your event!</p>
            <p className="additional-content">Let's make your event the talk of the town! </p>
            <p className="additional-content">  We have the expertise and creativity to ensure a truly unforgettable experience.</p>
            <p className="contact-message">Our team will contact you shortly....!</p>
          </div>
          <img src={`${process.env.PUBLIC_URL}/image/thank.jpg`} alt="description" className="thank-you-image" />


          
        </div>
      </div>
    </div>
  );
};

export default Payment;

