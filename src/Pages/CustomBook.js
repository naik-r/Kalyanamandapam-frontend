import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import './Custom.css'; // Custom CSS for styling available and unavailable dates

function CustomCalendar({ selectedDates, setSelectedDates, formData, setFormData }) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookedRooms, setBookedRooms] = useState({});
  const [loading, setLoading] = useState(false);
  const [privateEventDates, setPrivateEventDates] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await fetch('http://localhost:5000/api/booked-dates-rooms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched bookings:', data);
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchPrivateEventDates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/onlyhall/selected-dates-private-events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const privateEventDates = await response.json();
        console.log('Fetched private event dates:', privateEventDates);
        setPrivateEventDates(privateEventDates);
      } catch (error) {
        console.error('Error fetching private event dates:', error);
      }
    };
    fetchPrivateEventDates();
  }, []);

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

  const isUnavailableDate = date => {
    const dateStr = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];
    console.log('Checking date:', dateStr); // Log the date being checked
    const bookedRoomsForDate = bookedRooms[dateStr] || [];
    console.log('Booked rooms on date:', bookedRoomsForDate); // Log booked rooms for the date

    // Check if all rooms are booked for the date
    const allRoomsBooked = bookedRoomsForDate.length >= 10;

    // Check if the date is in the bookings array
    const isBookedDate = bookings.some(bookedDate => bookedDate.date === dateStr);

    return allRoomsBooked || isBookedDate;
  };

  const handleDateChange = async date => {
    console.log('fetchiiiiiiiiiiiiiiiiiiiiinhhhhhhhhhhhhhh')
    await fetchBookedRooms(date);

    const index = selectedDates.findIndex(selectedDate =>
      selectedDate.toDateString() === date.toDateString()
    );

    let updatedSelectedDates;
    if (index !== -1) {
      updatedSelectedDates = selectedDates.filter(selectedDate =>
        selectedDate.toDateString() !== date.toDateString()
      );
    } else {
      updatedSelectedDates = [...selectedDates, date];
    }

    setSelectedDates(updatedSelectedDates);

    // Reset selected rooms when date is deselected
    if (index !== -1) {
      setFormData(prevState => ({
        ...prevState,
        selectedRooms: prevState.selectedRooms.filter(room => room.date !== date.toDateString())
      }));
    }
  };

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

  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

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

  const getDateClass = date => {
    if (loading) return 'loading'; // Display loading indicator if loading is true
    if (isUnavailableDate(date)) return 'unavailable-date';
    if (selectedDates.some(selectedDate => selectedDate.toDateString() === date.toDateString())) return 'selected-date';

    // Function to normalize date for comparison
    const normalizeDate = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());

    // Check if the current date is in privateEventDates
    if (privateEventDates.some(unavailableDate =>
      normalizeDate(new Date(unavailableDate)).toISOString().split('T')[0] === normalizeDate(date).toISOString().split('T')[0]
    )) {
      return 'private-event'; // Apply red background for private event dates
    }

    return '';
  };

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  return (
    <div className="col-md-12">
      <label htmlFor="selectDate" className="form-label">
        Select Dates*
      </label>
      <div className="custom-calendar-wrapper">
        <div className="input-container">
          <input
            type="text"
            id="dates"
            className="form-control select-dates-inp"
            placeholder="Select Dates"
            readOnly
            onClick={toggleCalendar}
          />
          <div className="calendar-ic" onClick={toggleCalendar}>
            <FaCalendarAlt />
          </div>
        </div>
        {calendarOpen && (
          <div className="calendar-room-container">
            <DatePicker
              selected={null}
              onChange={handleDateChange}
              dayClassName={date => getDateClass(date)}
              minDate={today}
              maxDate={threeMonthsLater}
              inline
              required
            />
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
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomCalendar;
