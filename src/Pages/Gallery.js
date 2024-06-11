import React from 'react';

import "../App.css"
const Gallery = () => {
  return (
    <div id="gallerydiv" style={{backgroundColor:'#f0f0f0'}}>
      <h1 style={{ textAlign: 'center', fontStyle: 'italic' }}>Gallery</h1>
      <br /><br />
      <h3 id="marriage" style={{ textAlign: 'center', fontStyle: 'italic' }}>Marriage Hall</h3>
      <br />
      <div id="gallery">
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt11.jpg`} alt="wedding hall" height="250px" width="400px" id="gh"/>
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt13.jpg`} alt="wedding hall" height="250px" width="400px" id="gh" />
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt2.JPG`} alt="wedding hall" height="250px" width="400px" id="gh"/>
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt17.jpg`} alt="wedding hall" height="250px" width="400px" id="gh"/>
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt20.jpg`} alt="wedding hall" height="250px" width="400px" id="gh"/>
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt21.jpg`} alt="wedding hall" height="250px" width="400px" id="gh" />
      </div>

      <h3 id="banquet" style={{ textAlign: 'center', fontStyle: 'italic' }}>Banquet Hall</h3>
      <br />
      <div id="gallery">
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt28.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh"/>
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt29.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh"/>
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt30.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh"/>
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt31.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh"/>
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt24.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh"/>
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt27.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh"/>
      </div>

      <h3 id="park" style={{ textAlign: 'center', fontStyle: 'italic' }}>Parking Facility</h3>
      <br />
      <div id="gallery">
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt6.jpg`} alt="Parking Facility" height="250px" width="400px" id="gh" />
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt7.JPG`} alt="Parking Facility" height="250px" width="400px" id="gh"/>
      </div>

      <h3 id="dine" style={{ textAlign: 'center', fontStyle: 'italic' }}>Dining Hall</h3>
      <br />
      <div id="gallery">
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt26.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh" />
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt3.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh"/>
        <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt16.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh"/>
      </div>
    </div>
  );
};

export default Gallery;
