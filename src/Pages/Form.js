import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCalendar from './CustomCalendar';
import './Form.css'; // Assuming you have saved the CSS in a file named Form.css

function CombinedForm() {
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState([]);
  const [numGuests, setNumGuests] = useState(50);
  const [numDays, setNumDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(50000);
  const [withRooms, setWithRooms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    event: 'Wedding',
    description: '',
    services: {
      catering: false,
      decoration: false
    },
    numPersonsNeedingRoom: 10,
    roomType: 'AC',
    numRoomsNeeded: 1,
  });

  useEffect(() => {
    if (selectedDates.length > 0) {
      const dayDiff = selectedDates.length;
      setNumDays(dayDiff);
      calculateTotalPrice(dayDiff, numGuests, formData.services, formData.numRoomsNeeded, formData.roomType);
    }
  }, [selectedDates, numGuests, formData.services, formData.numRoomsNeeded, formData.roomType, withRooms]);

  const calculateTotalPrice = (days, guests, services, roomsNeeded, selectedRoomType) => {
    const hallCost = days * 50000;
    const serviceCost = (services.catering ? 30000 : 0) + (services.decoration ? 20000 : 0);
    const pricePerRoomPerDay = selectedRoomType === "AC" ? 1000 : 500;
    const roomCost = withRooms ? days * pricePerRoomPerDay * roomsNeeded : 0;
    const totalPrice = hallCost + serviceCost + roomCost;
    setTotalPrice(totalPrice);
  };

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
      const url = withRooms ? 'http://localhost:5000/api/halls' : 'http://localhost:5000/api/onlyhall';
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
      }, formData.numRoomsNeeded, formData.roomType);
    } else if (id === 'numGuests') {
      const guests = parseInt(value, 10);
      setNumGuests(guests);
      calculateTotalPrice(numDays, guests, formData.services, formData.numRoomsNeeded, formData.roomType);
    } else if (id === 'numPersonsNeedingRoom') {
      const personsNeedingRoom = parseInt(value, 10);
      setFormData(prevState => ({
        ...prevState,
        [id]: personsNeedingRoom
      }));
      calculateNumRoomsNeeded(personsNeedingRoom);
    } else if (id === 'roomType') {
      setFormData(prevState => ({
        ...prevState,
        [id]: value
      }));
      calculateTotalPrice(numDays, numGuests, formData.services, formData.numRoomsNeeded, value);
    } else if (id === 'numRoomsNeeded') {
      const roomsNeeded = parseInt(value, 10);
      setFormData(prevState => ({
        ...prevState,
        numRoomsNeeded: roomsNeeded
      }));
      calculateTotalPrice(numDays, numGuests, formData.services, roomsNeeded, formData.roomType);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [id]: value
      }));
    }
  };

  const calculateNumRoomsNeeded = (personsNeedingRoom) => {
    const roomsNeeded = Math.ceil(personsNeedingRoom / 4);
    setFormData(prevData => ({
      ...prevData,
      numRoomsNeeded: roomsNeeded
    }));
    calculateTotalPrice(numDays, numGuests, formData.services, roomsNeeded, formData.roomType);
  };

  return (
    <div id="imgbg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/gt2.jpg)` }}>
      <div id="avail" className="containerf">
        <div id="form" className="form-container">
          <h2 className="form-title">Booking Function Hall</h2>
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
                <label htmlFor="numGuests" className="form-label">Number of Guests</label>
                <input type="number" className="form-control" id="numGuests" value={numGuests} onChange={handleInputChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="numDays" className="form-label">Number of Days</label>
                <input type="number" className="form-control" id="numDays" value={numDays} readOnly />
              </div>
              <div className="col-md-12">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="roomOption" id="withRooms" checked={withRooms} onChange={() => setWithRooms(true)} />
                  <label className="form-check-label" htmlFor="withRooms">With Rooms</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="roomOption" id="withoutRooms" checked={!withRooms} onChange={() => setWithRooms(false)} />
                  <label className="form-check-label" htmlFor="withoutRooms">Without Rooms</label>
                </div>
              </div>
              {withRooms && (
                <>
                  <div className="col-md-6">
                    <label htmlFor="numPersonsNeedingRoom" className="form-label">Number of Persons Needing Room</label>
                    <input type="number" className="form-control" id="numPersonsNeedingRoom" value={formData.numPersonsNeedingRoom} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="roomType" className="form-label">Room Type</label>
                    <select id="roomType" className="form-control" value={formData.roomType} onChange={handleInputChange}>
                      <option value="AC">AC</option>
                      <option value="Non-AC">Non-AC</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="numRoomsNeeded" className="form-label">Number of Rooms Needed</label>
                    <input type="number" className="form-control" id="numRoomsNeeded" value={formData.numRoomsNeeded} onChange={handleInputChange} />
                  </div>
                </>
              )}
              <div className="col-md-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" className="form-control" value={formData.description} onChange={handleInputChange} />
              </div>
              <div className="col-md-12">
                <h4>Total Price: ₹{totalPrice}</h4>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Confirm</button>
            </div>
          </form>
        </div>
      </div>
      <div className="space">

      </div>
    </div>
  );
}

export default CombinedForm;
