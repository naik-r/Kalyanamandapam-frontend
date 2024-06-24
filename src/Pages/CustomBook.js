import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import './Custom.css'; // Custom CSS for styling available and unavailable dates

function CustomCalendar({ selectedDates, setSelectedDates, formData, setFormData }) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState([]);

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
      // Date already selected, remove it
      updatedSelectedDates = [...selectedDates];
      updatedSelectedDates.splice(index, 1);
      setSelectedDates(updatedSelectedDates);

      // Remove from unavailable dates
      setUnavailableDates(
        unavailableDates.filter(
          unavailableDate => unavailableDate.toDateString() !== date.toDateString()
        )
      );
    } else {
      // Date not selected, add it
      updatedSelectedDates = [...selectedDates, date];
      setSelectedDates(updatedSelectedDates);
      setUnavailableDates([...unavailableDates, date]);
    }

    // Log the selected dates to the console
    console.log('Selected dates:', updatedSelectedDates.map(d => d.toDateString()));
  };

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleRoomSelection = (roomNumber) => {
    const { selectedRooms } = formData;
    let updatedSelectedRooms;

    if (selectedRooms.includes(roomNumber)) {
      // Remove room number if already selected
      updatedSelectedRooms = selectedRooms.filter(room => room !== roomNumber);
    } else if (selectedRooms.length < 10) {
      // Add room number if less than 10 rooms selected
      updatedSelectedRooms = [...selectedRooms, roomNumber];
    } else {
      // Already at max rooms selected
      updatedSelectedRooms = selectedRooms;
    }

    // Update formData state with updated selected rooms
    setFormData(prevState => ({
      ...prevState,
      selectedRooms: updatedSelectedRooms
    }));

    // Log selected rooms to console
    console.log("Selected Rooms:", updatedSelectedRooms);
  };

  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

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
            className="form-control"
            placeholder="Select Dates"
            readOnly
            onClick={toggleCalendar}
          />
          <div className="calendar-icon" onClick={toggleCalendar}>
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
              <div>
              <h6 className="form-label">Select Room Numbers*</h6>
              <div className="room-selection-container">
                {[...Array(10)].map((_, index) => {
                  const roomNumber = index + 1;
                  const isRoomSelected = formData.selectedRooms.includes(roomNumber);
                  return (
                    <div
                      key={roomNumber}
                      className={`room-option ${isRoomSelected ? 'selected' : ''}`}
                      onClick={() => handleRoomSelection(roomNumber)}
                    >
                      G {roomNumber}
                    </div>
                  );
                })}
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
