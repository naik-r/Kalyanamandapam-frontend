import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CustomCalendar from './CustomCalendar';
import './Form.css'; // Assuming you have saved the CSS in a file named Form.css

function CombinedForm() {
  const [bookedRooms, setBookedRooms] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState([]);
  const [numGuests, setNumGuests] = useState(0); // Set default value to 0
  const [numDays, setNumDays] = useState(0); // Set default value to 0
  const [totalPrice, setTotalPrice] = useState(50000);
  const [withRooms, setWithRooms] = useState(false); // Set default value to false
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isPrivateEvent, setIsPrivateEvent] = useState(null);
  const [otherEvent, setOtherEvent] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    event: '',
    description: '',
    services: {
      catering: false,
      decoration: false
    },
    numPersonsNeedingRoom: 0, // Set default value to 0
    roomType: 'AC', // Set default value to 'AC'
    numRoomsNeeded: 0,
    selectedRooms: [], // Added selectedRooms state for room selection
  });

  useEffect(() => {
    fetchUnavailableDates();
  }, []);

  const fetchUnavailableDates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/onlyhall/unavailable-dates');
      const dates = await response.json();
      setUnavailableDates(dates.map(date => new Date(date)));
    } catch (error) {
      console.error("Failed to fetch unavailable dates:", error);
    }
  };

  // Calculate total price based on form inputs
  const calculateTotalPrice = useCallback((days, guests, services, roomsNeeded, selectedRoomType) => {
    const hallCost = days * 50000;
    const serviceCost = (services.catering ? 30000 : 0) + (services.decoration ? 20000 : 0);
    const pricePerRoomPerDay = selectedRoomType === "AC" ? 1000 : 500;
    const roomCost = withRooms ? days * pricePerRoomPerDay * roomsNeeded : 0;
    const totalPrice = hallCost + serviceCost + roomCost;
    setTotalPrice(totalPrice);
  }, [withRooms]);

  // Effect to update total price when inputs change
  useEffect(() => {
    if (selectedDates.length > 0) {
      const dayDiff = selectedDates.length;
      setNumDays(dayDiff);
      calculateTotalPrice(dayDiff, numGuests, formData.services, formData.numRoomsNeeded, formData.roomType);
    }
  }, [selectedDates, numGuests, formData.services, formData.numRoomsNeeded, formData.roomType, withRooms, calculateTotalPrice]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (withRooms && !formData.roomType) {
      alert('Please select a room type.');
      return;
    }

    // const bookingData = {
    //   ...formData,
    //   selectedDates: selectedDates.map(date => date.toISOString()), // Convert dates to ISO string
    //   unavailableDates: unavailableDates.map(date => date.toISOString()),
    //   totalPrice: totalPrice, // Ensure all fields are sent
    //   numDays: numDays,
    //   numGuests: numGuests,
    //   withRooms: withRooms,
    //   isPrivateEvent,
    //   otherEvent,
    // };
    const normalizeDate = (date) => {
      const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      return normalizedDate;
    };

    // Use normalizeDate function before saving to MongoDB
    const bookingData = {
      ...formData,
      selectedDates: selectedDates.map(date => normalizeDate(date).toISOString()), // Convert dates to ISO string
      unavailableDates: unavailableDates.map(date => normalizeDate(date).toISOString()),
      totalPrice: totalPrice, // Ensure all fields are sent
      numDays: numDays,
      numGuests: numGuests,
      withRooms: withRooms,
      isPrivateEvent,
      otherEvent,
    };

    console.log("bookingData", bookingData);

    try {
      const url = 'http://localhost:5000/api/onlyhall';
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
      }, formData.numRoomsNeeded, formData.roomType);
    } else if (id === 'numGuests') {
      const guests = parseInt(value, 10) || 0;
      setNumGuests(guests);
      calculateTotalPrice(numDays, guests, formData.services, formData.numRoomsNeeded, formData.roomType);
    } else if (id === 'numPersonsNeedingRoom') {
      const personsNeedingRoom = parseInt(value, 10) || 0;
      setFormData(prevState => ({
        ...prevState,
        [id]: personsNeedingRoom,
        numRoomsNeeded: Math.ceil(personsNeedingRoom / 2), // Update numRoomsNeeded
        selectedRooms: [] // Reset selected rooms
      }));
      calculateNumRoomsNeeded(personsNeedingRoom);
    } else if (id === 'roomType') {
      setFormData(prevState => ({
        ...prevState,
        [id]: value
      }));
      calculateTotalPrice(numDays, numGuests, formData.services, formData.numRoomsNeeded, value);
    } else if (id === 'numRoomsNeeded') {
      const roomsNeeded = parseInt(value, 10) || 0;
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

  // Calculate number of rooms needed based on persons needing room
  const calculateNumRoomsNeeded = (personsNeedingRoom) => {

    const roomsNeeded = Math.ceil(personsNeedingRoom / 2);
    setFormData(prevData => ({
      ...prevData,
      numRoomsNeeded: roomsNeeded,
      selectedRooms: [] // Reset selected rooms when the number of rooms needed changes
    }));
    calculateTotalPrice(numDays, numGuests, formData.services, roomsNeeded, formData.roomType);
  };

  // Handle room selection
  const handleRoomSelection = (date, roomNumber) => {
    const dateStr = date.toDateString();
    const selectedRoomForDate = formData.selectedRooms.find(room => room.date === dateStr);
    let updatedSelectedRooms;

    if (selectedRoomForDate) {
      if (selectedRoomForDate.rooms.includes(roomNumber)) {
        updatedSelectedRooms = formData.selectedRooms.map(room =>
          room.date === dateStr
            ? { ...room, rooms: room.rooms.filter(r => r !== roomNumber) }
            : room
        );
      } else if (selectedRoomForDate.rooms.length < formData.numRoomsNeeded) {
        updatedSelectedRooms = formData.selectedRooms.map(room =>
          room.date === dateStr
            ? { ...room, rooms: [...room.rooms, roomNumber] }
            : room
        );
      } else {
        updatedSelectedRooms = formData.selectedRooms;
      }
    } else {
      updatedSelectedRooms = [...formData.selectedRooms, { date: dateStr, rooms: [roomNumber] }];
    }

    setFormData(prevState => ({
      ...prevState,
      selectedRooms: updatedSelectedRooms,
    }));

    console.log('Selected Rooms:', updatedSelectedRooms);
  };

  const fetchBookedRooms = async date => {
    const dateStr = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];
    console.log('Fetching rooms for date:', dateStr);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/booked-rooms?date=${dateStr}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBookedRooms(prevRooms => ({
        ...prevRooms,
        [dateStr]: data
      }));
      console.log('Fetched booked rooms:', data);
    } catch (error) {
      console.error('Error fetching booked rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const roomOptions = date => {
    const { numPersonsNeedingRoom } = formData;
    const numRoomsNeeded = Math.ceil(numPersonsNeedingRoom / 2);
    const dateStr = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];

    const bookedRoomsForDate = bookedRooms[dateStr] || [];
    const selectedRoomsForDate = formData.selectedRooms.find(room => room.date === date.toDateString())?.rooms || [];

    return [...Array(10)].map((_, index) => {
      const roomNumber = index + 1;
      const isRoomAlreadyBooked = bookedRoomsForDate.includes(roomNumber);
      const isRoomSelected = selectedRoomsForDate.includes(roomNumber);
      const isDisabled = selectedRoomsForDate.length >= numRoomsNeeded && !isRoomSelected;

      let optionClass = 'room-option';
      if (isRoomAlreadyBooked) {
        optionClass += ' booked';
      }
      if (isRoomSelected) {
        optionClass += ' selected';
      }
      if (isDisabled || isRoomAlreadyBooked) {
        optionClass += ' disabled';
      }

      return (
        <div
          key={roomNumber}
          className={optionClass}
          onClick={() => !isDisabled && !isRoomAlreadyBooked && handleRoomSelection(date, roomNumber)}
        >
          G {roomNumber}
        </div>
      );
    });
  };

  useEffect(() => {
    if (selectedDates) {
      for (let i = 0; i < selectedDates.length; i++) {
        fetchBookedRooms(selectedDates[i]);
      }
    }
  }, [selectedDates]);
  

  const handleChange = (selectedDate) => {
    if(!selectedDates[0]){
      alert("Please Select The Date!")
    }
    else{
    setWithRooms(true);
    roomOptions(selectedDates[0]);
    }
  };
  return (
    <div id="imgbg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/gt2.jpg)` }}>
      <div id="avail" className="containerf">
        <div id="form" className="form-container">
          <h2 className="form-title"> Function Hall Booking</h2>
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
              <div className="col-md-6">
                <label htmlFor="event" className="form-lab">Select Event Type*</label>
                <div className="event-type-container">
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="privateEvent"
                        checked={isPrivateEvent === true}
                        onChange={() => setIsPrivateEvent(true)}
                      />
                      <label className="form-check-label" htmlFor="privateEvent">Functions</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="publicEvent"
                        checked={isPrivateEvent === false}
                        onChange={() => setIsPrivateEvent(false)}
                      />
                      <label className="form-check-label" htmlFor="publicEvent">Official</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="otherEventRadio"
                        checked={isPrivateEvent === 'other'}
                        onChange={() => setIsPrivateEvent('other')}
                      />
                      <label className="form-check-label" htmlFor="otherEventRadio">Others</label>
                    </div>
                  </div>
                  {isPrivateEvent === 'other' && (
                    <input
                      type="text"
                      id="otherEvent"
                      className="form-control event-select"
                      placeholder="Enter event type"
                      value={otherEvent}
                      onChange={(e) => setOtherEvent(e.target.value)}
                      required
                    />
                  )}
                  {isPrivateEvent !== 'other' && isPrivateEvent !== null && (
                    <select
                      id="event"
                      className="form-control event-select"
                      value={formData.event}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select an event</option>
                      {isPrivateEvent
                        ? <>
                          <option value="Birthday party">Birthday party</option>
                          <option value="Meeting">Meeting</option>
                          <option value="Baby Shower">Baby Shower</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Engagement">Engagement</option>
                          <option value="Reception">Reception</option>
                        </>
                        : <>
                          <option value="political">Political Meetings</option>
                          <option value="business">Business Meetings</option>
                          <option value="conference">Conferences</option>
                          <option value="shows">Shows</option>
                          <option value="">Workshoworkshops</option>

                        </>
                      }
                    </select>
                  )}
                </div>
                <CustomCalendar
                  selectedDates={selectedDates}
                  setSelectedDates={setSelectedDates}
                  unavailableDates={unavailableDates}
                />
                <div className="col-md-6">

                </div>
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
                <input type="number" className="form-control" id="numGuests" value={numGuests} onChange={handleInputChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="numDays" className="form-label">Number of Days</label>
                <input type="number" className="form-control" id="numDays" value={numDays} readOnly />
              </div>
              <div className="col-md-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="roomOption"
                    id="withRooms"
                    checked={withRooms === true}setWithRooms
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="withRooms">With Rooms</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="roomOption"
                    id="withoutRooms"
                    checked={withRooms === false}
                    onChange={() => setWithRooms(false)}
                  />
                  <label className="form-check-label" htmlFor="withoutRooms">Without Rooms</label>
                </div>
              </div>
              {withRooms && (
                <>
                  <div className="col-md-6">
                    <label htmlFor="numPersonsNeedingRoom" className="form-label">Number of Persons Needing Room*</label>
                    <input type="number" className="form-control" id="numPersonsNeedingRoom" value={formData.numPersonsNeedingRoom} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="roomType" className="form-label">Room Type*</label>
                    <select id="roomType" className="form-control" value={formData.roomType} onChange={handleInputChange}>
                      <option value="" disabled>Room Type</option>
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
                  {/* Room selection */}
                  {/* <div className="col-md-12">
                    <h6 className="form-label">Select Room Numbers*</h6>
                    <div className="room-select-container">
                          <div>
                            G {roomNumber}
                          </div>
                        );

                    </div>
                  </div> */}
                   {selectedDates.length > 0 && (
              <div className="selected-dates-rooms">
                <h4></h4>
                <div>
                  {selectedDates.map((date, index) => (
                    <div key={index} className="room-options">
                      <h5>{date.toDateString()}</h5>
                      <div className="room-options-grid">{roomOptions(date)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
      <div className="space"></div>
    </div>
  );
}

export default CombinedForm;
