import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import './Custom.css'; // Custom CSS for styling available and unavailable dates

function CustomCalendar({ selectedDates, setSelectedDates, formData, setFormData }) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      selectedRooms: [] // Reset selected rooms
    }));
  }, [formData.numPersonsNeedingRoom]);

  const isUnavailableDate = date => {
    return unavailableDates.some(
      unavailableDate => unavailableDate.toDateString() === date.toDateString()
    );
  };

  const getDateClass = date => {
    if (isUnavailableDate(date)) return 'unavailable-date';
    return '';
  };

  const handleDateChange = date => {
    const index = selectedDates.findIndex(selectedDate =>
      selectedDate.toDateString() === date.toDateString()
    );

    let updatedSelectedDates;
    if (index !== -1) {
      updatedSelectedDates = [...selectedDates];
      updatedSelectedDates.splice(index, 1);
      setSelectedDates(updatedSelectedDates);
      setUnavailableDates(
        unavailableDates.filter(
          unavailableDate => unavailableDate.toDateString() !== date.toDateString()
        )
      );
    } else {
      updatedSelectedDates = [...selectedDates, date];
      setSelectedDates(updatedSelectedDates);
      setUnavailableDates([...unavailableDates, date]);
    }

    console.log('Selected dates:', updatedSelectedDates.map(d => d.toDateString()));
  };

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleRoomSelection = (roomNumber) => {
    const { selectedRooms, numRoomsNeeded } = formData;
    let updatedSelectedRooms;

    if (selectedRooms.includes(roomNumber)) {
      updatedSelectedRooms = selectedRooms.filter(room => room !== roomNumber);
    } else if (selectedRooms.length < numRoomsNeeded) {
      updatedSelectedRooms = [...selectedRooms, roomNumber];
    } else {
      updatedSelectedRooms = selectedRooms;
    }

    setFormData(prevState => ({
      ...prevState,
      selectedRooms: updatedSelectedRooms
    }));

    console.log("Selected Rooms:", updatedSelectedRooms);
  };

  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

  const roomOptions = () => {
    const { numPersonsNeedingRoom } = formData;
    const numRoomsNeeded = Math.ceil(numPersonsNeedingRoom / 2);

    return [...Array(10)].map((_, index) => {
      const roomNumber = index + 1;
      const isRoomSelected = formData.selectedRooms.includes(roomNumber);
      const isDisabled = formData.selectedRooms.length >= numRoomsNeeded && !isRoomSelected;

      return (
        <div
          key={roomNumber}
          className={`room-option ${isRoomSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
          onClick={() => !isDisabled && handleRoomSelection(roomNumber)}
        >
          G {roomNumber}
        </div>
      );
    });
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
            className="form-control select-dates-input" // Add unique class here
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
              <div className="room-cont">
                <h6 className="form-label">Select Room Numbers*</h6>
                <div className="room-selection-container">
                  {roomOptions()}
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
