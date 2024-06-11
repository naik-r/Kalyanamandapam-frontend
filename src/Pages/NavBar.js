import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
function NavBar() {
  return (

<div>
<nav className="navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <img src={`${process.env.PUBLIC_URL}/image/logo1.png`}  alt="logo" height="45px" width="45px" className="rounded-image" />
    <a className="navbar-brand" href="#Home">
      <b><span className="animated-text">GANGAARAM FUNCTION HALL</span></b>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
        <li className="nav-item" style={{ paddingLeft: '40%' }}>
          <Link className="nav-link active" aria-current="page" to="/" id="h">Home</Link>
        </li>
        <li className="nav-item" style={{ marginLeft: '40px' }}>
          <a className="nav-link" href="#Amenities" id="h">Amenities</a>
        </li>
        <li className="nav-item" style={{ marginLeft: '40px' }}>
          <Link className="nav-link" to="/gallery" id="h">Gallery</Link> 
        </li>
        <li className="nav-item" style={{ marginLeft: '40px' }}>
          <Link className="nav-link" to="/book" id="h">Bookings</Link>
        </li>
        <li className="nav-item" style={{ paddingLeft: '40px' }}>
          <Link className="nav-link" to="/contact" id="h">ContactUs</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>
);
}
export default NavBar;