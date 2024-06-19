import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCalendar from './CustomCalendar';
import './Form.css';

function FormWithRooms() {
  const navigate = useNavigate();
  const [numDays, setNumDays] = useState(1); // Initialize numDays with default value
  const [totalPrice, setTotalPrice] = useState(0);
  const [numGuests, setNumGuests] = useState(50);
  const [selectedDates, setSelectedDates] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    description: '',
    numPersonsNeedingRoom: 10,
    roomType: 'AC',
    numRoomsNeeded: 1,
  });

  // useEffect to update numDays and calculate totalPrice
  useEffect(() => {
    if (selectedDates.length > 0) {
      const dayDiff = selectedDates.length;
      setNumDays(dayDiff); // Update numDays state
      calculateTotalPrice(dayDiff, numGuests, formData.numRoomsNeeded, formData.roomType);
    }
  }, [selectedDates, numGuests, formData.numRoomsNeeded, formData.roomType]);

  // Function to calculate total price
  const calculateTotalPrice = (days, guests, roomsNeeded, selectedRoomType) => {
    const pricePerRoomPerDay = selectedRoomType === "AC" ? 1000 : 500;
    const roomCost = days * pricePerRoomPerDay * roomsNeeded;
    setTotalPrice(roomCost); // Update totalPrice state with only room cost
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
      const response = await fetch('http://localhost:5000/api/halls', {
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
    const { id, value } = event.target;

    if (id === 'numGuests') {
      const guests = parseInt(value, 10);
      setNumGuests(guests); // Update numGuests state
      calculateTotalPrice(numDays, guests, formData.numRoomsNeeded, formData.roomType); // Recalculate totalPrice
    } else if (id === 'numPersonsNeedingRoom') {
      const personsNeedingRoom = parseInt(value, 10);
      setFormData(prevState => ({
        ...prevState,
        [id]: personsNeedingRoom
      }));
      calculateNumRoomsNeeded(personsNeedingRoom); // Recalculate numRoomsNeeded and totalPrice
    } else if (id === 'roomType') {
      setFormData(prevState => ({
        ...prevState,
        [id]: value
      }));
      calculateTotalPrice(numDays, numGuests, formData.numRoomsNeeded, value); // Recalculate totalPrice
    } else if (id === 'numRoomsNeeded') {
      const roomsNeeded = parseInt(value, 10);
      setFormData(prevState => ({
        ...prevState,
        numRoomsNeeded: roomsNeeded
      }));
      calculateTotalPrice(numDays, numGuests, roomsNeeded, formData.roomType); // Recalculate totalPrice
    } else {
      setFormData(prevState => ({
        ...prevState,
        [id]: value
      }));
    }
  };

  // Calculate number of rooms needed based on persons needing room
  const calculateNumRoomsNeeded = (personsNeedingRoom) => {
    const roomsNeeded = Math.ceil(personsNeedingRoom / 4); // Assuming each room can accommodate up to 4 persons
    setFormData(prevData => ({
      ...prevData,
      numRoomsNeeded: roomsNeeded
    }));
    calculateTotalPrice(numDays, numGuests, roomsNeeded, formData.roomType); // Recalculate totalPrice
  };

  return (
    <div id="imgbg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/gt2.jpg)` }}>
      <div id="avail" className="containerf">
        <div id="form" className="form-container">
          <h2 className="form-title">Booking Rooms</h2>
          
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
                <label htmlFor="numPersonsNeedingRoom" className="form-label">Number of Persons Needing Room*</label>
                <input
                  type="number"
                  className="form-control"
                  id="numPersonsNeedingRoom"
                  value={formData.numPersonsNeedingRoom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="roomType" className="form-label">Room Type*</label>
                <select
                  className="form-control"
                  id="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="numRoomsNeeded" className="form-label">Number of Rooms</label>
                <input
                  type="number"
                  className="form-control"
                  id="numRoomsNeeded"
                  value={formData.numRoomsNeeded}
                  readOnly
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

export default FormWithRooms;
