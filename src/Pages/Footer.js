import React from 'react';
import '../App.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <ul>
            <li className="contact-item">
              <i className="fas fa-map-marker-alt"></i> Gangaram Function Hall, KT Rd, Varadaraja Nagar, Tirupati-517501
            </li>
            <li className="contact-item">
              <i className="fas fa-phone"></i> +91 9493372522
            </li>
            <li className="contact-item">
              <i className="fas fa-envelope"></i> info@gangaramfunctionhall.com
            </li>
          </ul>
        </div>
        <div className="copyright">
          <i className="fa-regular fa-copyright"></i> {currentYear} Gangaram. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
