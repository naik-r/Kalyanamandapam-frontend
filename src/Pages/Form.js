import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCalendar from './CustomCalendar';
import './Form.css';

function FormWithoutRooms() {
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState([]);
  const [numGuests, setNumGuests] = useState(50);
  const [numDays, setNumDays] = useState(1); // Initialize numDays with default value
  const [totalPrice, setTotalPrice] = useState(50000);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    event: 'Wedding',
    description: '',
    services: {
      catering: false,
      decoration: false
    }
  });

  // useEffect to update numDays and calculate totalPrice
  useEffect(() => {
    if (selectedDates.length > 0) {
      const dayDiff = selectedDates.length;
      setNumDays(dayDiff); // Update numDays state
      calculateTotalPrice(dayDiff, numGuests, formData.services);
    }
  }, [selectedDates, numGuests, formData.services]);

  // Function to calculate total price
  const calculateTotalPrice = (days, guests, services) => {
    const hallCost = days * 50000;
    const serviceCost = (services.catering ? 30000 : 0) + (services.decoration ? 20000 : 0); // Adjust service costs as needed
    const totalPrice = hallCost + serviceCost;
    setTotalPrice(totalPrice); // Update totalPrice state
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      ...formData,
      selectedDates,
      numGuests,
      numDays,
      totalPrice
    };

    try {
      const url = 'http://localhost:5000/api/onlyhall'; // Assuming API endpoint for function hall booking without rooms
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
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

  // Handle input changes
  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        services: {
          ...prevState.services,
          [id]: checked
        }
      }));
      calculateTotalPrice(numDays, numGuests, {
        ...formData.services,
        [id]: checked
      });
    } else if (id === 'numGuests') {
      const guests = parseInt(value, 10);
      setNumGuests(guests); // Update numGuests state
      calculateTotalPrice(numDays, guests, formData.services); // Recalculate totalPrice
    } else {
      setFormData(prevState => ({
        ...prevState,
        [id]: value
      }));
    }
  };

  return (
    <div id="imgbg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/gt2.jpg)` }}>
      <div id="avail" className="containerf">
        <div id="form" className="form-container">
          <h2 className="form-title">Booking Function Hall </h2>

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
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="catering" checked={formData.services.catering} onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="catering">Catering</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="decoration" checked={formData.services.decoration} onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="decoration">Decoration</label>
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="numGuests" className="form-label">Number of Guests*</label>
                <input
                  type="number"
                  className="form-control"
                  id="numGuests"
                  min="1"
                  value={numGuests}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="numDays" className="form-label">Number of Days</label>
                <input type="number" className="form-control" id="numDays" value={numDays} readOnly />
              </div>
              <div className="col-md-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="totalPrice" className="form-label">Total Price</label>
                <input type="text" className="form-control" id="totalPrice" value={totalPrice} readOnly />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormWithoutRooms;
