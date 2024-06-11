import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomCalendar from './CustomCalendar';
import './Form.css';

function BookRoom() {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(60000);
  const [numGuests, setNumGuests] = useState(50);
  const [numPersonsNeedingRoom, setNumPersonsNeedingRoom] = useState(10);
  const [numRoomsNeeded, setNumRoomsNeeded] = useState(1);
  const [roomType, setRoomType] = useState("AC");
  const [selectedDates, setSelectedDates] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/payment");
  };

  const handleNumGuestsChange = (event) => {
    const guests = parseInt(event.target.value, 10);
    setNumGuests(guests);
    calculateTotalPrice(selectedDates.length, guests, numRoomsNeeded, roomType);
  };

  const handleNumPersonsNeedingRoomChange = (event) => {
    const personsNeedingRoom = parseInt(event.target.value, 10);
    setNumPersonsNeedingRoom(personsNeedingRoom);
    calculateNumRoomsNeeded(personsNeedingRoom);
    calculateTotalPrice(selectedDates.length, numGuests, numRoomsNeeded, roomType);
  };

  const handleRoomTypeChange = (event) => {
    const selectedRoomType = event.target.value;
    setRoomType(selectedRoomType);
    calculateTotalPrice(selectedDates.length, numGuests, numRoomsNeeded, selectedRoomType);
  };

  const calculateNumRoomsNeeded = (personsNeedingRoom) => {
    const roomsNeeded = Math.ceil(personsNeedingRoom / 4); // Assuming each room can accommodate up to 4 persons
    setNumRoomsNeeded(roomsNeeded);
  };

  const calculateTotalPrice = (days, guests, roomsNeeded, selectedRoomType) => {
    const pricePerRoomPerDay = selectedRoomType === "AC" ? 500 : 200;
    const totalPrice = (days * pricePerRoomPerDay * roomsNeeded) + (days * 50000);
    setTotalPrice(totalPrice);
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
                <input type="text" className="form-control" id="inputfirstname" required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputlastname" className="form-label">Last Name*</label>
                <input type="text" className="form-control" id="inputlastname" />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputnum" className="form-label">Contact Number*</label>
                <input type="tel" className="form-control" id="inputnum" required />
              </div>
              <CustomCalendar selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
              <div className="col-md-6">
                <label htmlFor="selectevent" className="form-label">Select Event*</label>
                <select name="Event" id="event" className="form-control">
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
                <input type="number" className="form-control" id="numGuests" min="1" value={numGuests} onChange={handleNumGuestsChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="numPersonsNeedingRoom" className="form-label">Number of Persons Needing Room*</label>
                <input type="number" className="form-control" id="numPersonsNeedingRoom" min="1" value={numPersonsNeedingRoom} onChange={handleNumPersonsNeedingRoomChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="roomType" className="form-label">Room Type*</label>
                <select className="form-control" id="roomType" value={roomType} onChange={handleRoomTypeChange} required>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="numRoomsNeeded" className="form-label">Number of Rooms Needed*</label>
                <input type="number" className="form-control" id="numRoomsNeeded" min="1" value={numRoomsNeeded} readOnly required />
              </div>
              <div className="col-md-6">
                <label htmlFor="numDays" className="form-label">Number of Days*</label>
                <input type="number" className="form-control" id="numDays" min="1" value={selectedDates.length} readOnly required />
              </div>
              <div className="col-md-6">
                <label htmlFor="price" className="form-label">Total Price (₹)</label>
                <input type="number" className="form-control" id="price" value={totalPrice} readOnly />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">Description</label>
                <textarea className="form-control" id="inputAddress2" placeholder="Description" rows="4"></textarea>
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

export default BookRoom;
