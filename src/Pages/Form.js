import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCalendar from './CustomCalendar';
import './Form.css';

function Form() {
  const navigate = useNavigate();
  const [numDays, setNumDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(50000);
  const [numGuests, setNumGuests] = useState(50);
  const [selectedDates, setSelectedDates] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    event: 'Wedding',
    description: ''
  });

  useEffect(() => {
    if (selectedDates.length > 0) {
      const dayDiff = selectedDates.length;
      setNumDays(dayDiff);
      setTotalPrice(50000 * dayDiff);
    }
  }, [selectedDates]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      ...formData,
      selectedDates,
      numGuests,
      numDays,
      totalPrice
    };
    console.log("bookingData",bookingData)

    try {
      const url = formData.event === "Wedding" || formData.event === "Engagement" || formData.event === "Reception"
        ? 'http://localhost:5000/api/halls'
        : 'http://localhost:5000/api/onlyhall';
      
      const response = await fetch('http://localhost:5000/api/onlyhall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( )
      });

      if (response.ok) {
        alert('Reservation submitted successfully!');
        navigate("/payment");
      } else {
        alert('Failed to submit reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please check the console for more details.');
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleNumGuestsChange = (event) => {
    const guests = parseInt(event.target.value, 10);
    setNumGuests(guests);
  };

  return (
    <div id="imgbg">
      <div id="avail" className="containerf">
        <div id="form" className="form-container">
          <h2 className="form-title">Booking Form</h2>
          <p>Information in the following section marked with an asterisk (*) is required in order to submit this form.</p>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">First Name*</label>
                <input type="text" className="form-control" id="firstName" value={formData.firstName} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">Last Name*</label>
                <input type="text" className="form-control" id="lastName" value={formData.lastName} onChange={handleInputChange} />
              </div>
              <div className="col-md-12">
                <label htmlFor="contactNumber" className="form-label">Contact Number*</label>
                <input type="tel" className="form-control" id="contactNumber" value={formData.contactNumber} onChange={handleInputChange} required />
              </div>
              <CustomCalendar 
                selectedDates={selectedDates} 
                setSelectedDates={setSelectedDates} 
              />
              <div className="col-md-6">
                <label htmlFor="event" className="form-label">Select Event*</label>
                <select id="event" className="form-control" value={formData.event} onChange={handleInputChange}>
                  <option value="Wedding">Wedding</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Reception">Reception</option>
                  <option value="Birthday party">Birthday party</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Baby Shower">Baby Shower</option>
                </select>
              </div>
              <div className="col-md-12">
                <label htmlFor="services" className="form-label">Our Services</label>
                <ul className="list-group">
                  <li className="list-group-item" id="sh">Catering</li>
                  <li className="list-group-item" id="sh">Decoration</li>
                  <li className="list-group-item" id="sh">Rooms</li>
                </ul>
              </div>
              <div className="col-md-6">
                <label htmlFor="numGuests" className="form-label">Number of Guests*</label>
                <input
                  type="number"
                  className="form-control"
                  id="numGuests"
                  min="1"
                  value={numGuests}
                  onChange={handleNumGuestsChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="numDays" className="form-label">Number of Days*</label>
                <input type="number" className="form-control" id="numDays" min="1" value={numDays} readOnly />
              </div>
              <div className="col-md-6">
                <label htmlFor="totalPrice" className="form-label">Total Price (₹)</label>
                <input type="number" className="form-control" id="totalPrice" value={totalPrice} readOnly />
              </div>
              <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" placeholder="Description" rows="4" value={formData.description} onChange={handleInputChange}></textarea>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" id="submit1">Pay Now</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
