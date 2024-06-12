import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCalendar from './CustomCalendar';
import './Form.css';

function BookRoom() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    event: 'Wedding',
    numGuests: 50,
    numPersonsNeedingRoom: 10,
    roomType: 'AC',
    numRoomsNeeded: 1,
    numDays: 0,
    totalPrice: 60000,
    description: '',
    selectedDates: []
  });

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = { ...formData };

    const response = await fetch('http://localhost:5000/api/halls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Reservation submitted successfully!');
        navigate("/payment");
    } else {
        alert('Failed to submit reservation.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'numGuests') {
      const guests = parseInt(value, 10);
      calculateTotalPrice(formData.numDays, guests, formData.numRoomsNeeded, formData.roomType);
    } else if (name === 'numPersonsNeedingRoom') {
      const personsNeedingRoom = parseInt(value, 10);
      calculateNumRoomsNeeded(personsNeedingRoom);
    } else if (name === 'roomType') {
      calculateTotalPrice(formData.numDays, formData.numGuests, formData.numRoomsNeeded, value);
    }
  };

  const setSelectedDates = (dates) => {
    setFormData(prevData => ({
      ...prevData,
      selectedDates: dates,
      numDays: dates.length
    }));
    calculateTotalPrice(dates.length, formData.numGuests, formData.numRoomsNeeded, formData.roomType);
  };

  const calculateNumRoomsNeeded = (personsNeedingRoom) => {
    const roomsNeeded = Math.ceil(personsNeedingRoom / 4); // Assuming each room can accommodate up to 4 persons
    setFormData(prevData => ({
      ...prevData,
      numRoomsNeeded: roomsNeeded
    }));
    calculateTotalPrice(formData.numDays, formData.numGuests, roomsNeeded, formData.roomType);
  };

  const calculateTotalPrice = (days, guests, roomsNeeded, selectedRoomType) => {
    const pricePerRoomPerDay = selectedRoomType === "AC" ? 500 : 200;
    const totalPrice = (days * pricePerRoomPerDay * roomsNeeded) + (days * 50000);
    setFormData(prevData => ({
      ...prevData,
      totalPrice: totalPrice
    }));
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
                <label htmlFor="inputfirstname" className="form-label">First Name*</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="inputfirstname" 
                  name="firstName" 
                  value={formData.firstName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputlastname" className="form-label">Last Name*</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="inputlastname" 
                  name="lastName" 
                  value={formData.lastName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputnum" className="form-label">Contact Number*</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  id="inputnum" 
                  name="contactNumber" 
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required 
                />
              </div>
              <CustomCalendar selectedDates={formData.selectedDates} setSelectedDates={setSelectedDates} />
              <div className="col-md-6">
                <label htmlFor="selectevent" className="form-label">Select Event*</label>
                <select 
                  name="event" 
                  id="event" 
                  className="form-control" 
                  value={formData.event}
                  onChange={handleChange}
                  required
                >
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
                  name="numGuests" 
                  min="1" 
                  value={formData.numGuests} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="numPersonsNeedingRoom" className="form-label">Number of Persons Needing Room*</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="numPersonsNeedingRoom" 
                  name="numPersonsNeedingRoom" 
                  min="1" 
                  value={formData.numPersonsNeedingRoom} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="roomType" className="form-label">Room Type*</label>
                <select 
                  className="form-control" 
                  id="roomType" 
                  name="roomType" 
                  value={formData.roomType} 
                  onChange={handleChange} 
                  required
                >
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="numRoomsNeeded" className="form-label">Number of Rooms Needed*</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="numRoomsNeeded" 
                  name="numRoomsNeeded" 
                  min="1" 
                  value={formData.numRoomsNeeded} 
                  readOnly 
                  required 
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="numDays" className="form-label">Number of Days*</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="numDays" 
                  name="numDays" 
                  min="1" 
                  value={formData.numDays} 
                  readOnly 
                  required 
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="price" className="form-label">Total Price (₹)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="price" 
                  name="totalPrice" 
                  value={formData.totalPrice} 
                  readOnly 
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  id="inputAddress2" 
                  name="description" 
                  placeholder="Description" 
                  rows="4" 
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" id="submit1">Confirm</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookRoom;
