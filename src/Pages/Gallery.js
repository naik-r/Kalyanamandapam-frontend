import React, { useEffect } from 'react';
import "./Gallery.css";

const Gallery = () => {
  useEffect(() => {
    const images = document.querySelectorAll('.image');

    const handleScroll = () => {
      images.forEach(image => {
        const rect = image.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          image.classList.add('in-view');
        } else {
          image.classList.remove('in-view');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="gallerydiv">
      <br />
      <h1 className='gal'>Gallery</h1>
      <br />
      <h3 id="marriage">Marriage Hall</h3>
      <br />
      <div id="gallery">
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt11.jpg`} alt="wedding hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt13.jpg`} alt="wedding hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt2.JPG`} alt="wedding hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt17.jpg`} alt="wedding hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt20.jpg`} alt="wedding hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt21.jpg`} alt="wedding hall" height="250px" width="400px" id="gh" />
        </div>
      </div>

      <h3 id="banquet">Banquet Hall</h3>
      <br />
      <div id="gallery">
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt28.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt29.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt30.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt31.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt24.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt27.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh" />
        </div>
      </div>

      <h3 id="park">Parking Facility</h3>
      <br />
      <div id="gallery">
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt6.jpg`} alt="Parking Facility" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt7.JPG`} alt="Parking Facility" height="250px" width="400px" id="gh" />
        </div>
      </div>

      <h3 id="dine">Dining Hall</h3>
      <br />
      <div id="gallery">
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt26.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt3.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh" />
        </div>
        <div className="image">
          <img className="shadow p-3 mb-5 m-3 bg-body rounded" src={`${process.env.PUBLIC_URL}/image/gt16.jpg`} alt="Banquet Hall" height="250px" width="400px" id="gh" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
