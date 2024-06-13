import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCalendar from './CustomCalendar';
import './Form.css';

function Form() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('withoutRooms');
  const [numDays, setNumDays] = useState(1); // Initialize numDays with default value
  const [totalPrice, setTotalPrice] = useState(50000);
  const [numGuests, setNumGuests] = useState(50);
  const [selectedDates, setSelectedDates] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    event: 'Wedding',
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
      calculateTotalPrice(dayDiff, numGuests, formData.numRoomsNeeded, formData.roomType, selectedOption);
    }
  }, [selectedDates, numGuests, formData.numRoomsNeeded, formData.roomType, selectedOption]);

  // Function to calculate total price
  const calculateTotalPrice = (days, guests, roomsNeeded, selectedRoomType, selectedOption) => {
    const pricePerRoomPerDay = selectedRoomType === "AC" ? 500 : 200;
    const roomCost = selectedOption === "withRooms" ? days * pricePerRoomPerDay * roomsNeeded : 0;
    const hallCost = days * 50000;
    const totalPrice = hallCost + roomCost;
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
      const url = selectedOption === 'withRooms' ? 'http://localhost:5000/api/halls' : 'http://localhost:5000/api/onlyhall';
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
    const { id, value } = event.target;

    if (id === 'numGuests') {
      const guests = parseInt(value, 10);
      setNumGuests(guests); // Update numGuests state
      calculateTotalPrice(numDays, guests, formData.numRoomsNeeded, formData.roomType, selectedOption); // Recalculate totalPrice
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
      calculateTotalPrice(numDays, numGuests, formData.numRoomsNeeded, value, selectedOption); // Recalculate totalPrice
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
    calculateTotalPrice(numDays, numGuests, roomsNeeded, formData.roomType, selectedOption); // Recalculate totalPrice
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
              <div className="col-md-12">
                <label className="form-label">Do you need rooms?</label>
                <div>
                  <input
                    type="radio"
                    id="withoutRooms"
                    name="roomOption"
                    value="withoutRooms"
                    checked={selectedOption === 'withoutRooms'}
                    onChange={() => setSelectedOption('withoutRooms')}
                  />
                  <label htmlFor="withoutRooms">No</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="withRooms"
                    name="roomOption"
                    value="withRooms"
                    checked={selectedOption === 'withRooms'}
                    onChange={() => setSelectedOption('withRooms')}
                  />
                  <label htmlFor="withRooms">Yes</label>
                </div>
              </div>
              {selectedOption === 'withRooms' && (
                <>
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
                    <label htmlFor="numRoomsNeeded" className="form-label">Number of Rooms Needed*</label>
                    <input
                      type="number"
                      className="form-control"
                      id="numRoomsNeeded"
                      value={formData.numRoomsNeeded}
                      readOnly
                      required
                    />
                  </div>
                </>
              )}
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
