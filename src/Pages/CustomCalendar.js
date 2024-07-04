import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomCalendar.css'; // Custom CSS for styling available and unavailable dates

function CustomCalendar({ selectedDates, setSelectedDates, unavailableDates = [] }) {
  const [selected, setSelected] = useState(selectedDates);

  useEffect(() => {
    setSelectedDates(selected);
  }, [selected, setSelectedDates]);

  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

  const normalizeDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const isUnavailableDate = (date) => {
    return unavailableDates.some(
      (unavailableDate) => normalizeDate(unavailableDate).getTime() === normalizeDate(date).getTime()
    );
  };

  const handleDateClick = (date) => {
    if (isUnavailableDate(date)) {
      return;
    }

    const normalizedDate = normalizeDate(date);
    console.log('Clicked date:', normalizedDate.toISOString()); // Log clicked date to check format

    const index = selected.findIndex(
      (selectedDate) => normalizeDate(selectedDate).getTime() === normalizedDate.getTime()
    );

    let updatedSelectedDates;
    if (index !== -1) {
      // Date already selected, remove it
      updatedSelectedDates = [...selected];
      updatedSelectedDates.splice(index, 1);
    } else {
      // Date not selected, add it
      updatedSelectedDates = [...selected, normalizedDate];
    }
    setSelected(updatedSelectedDates);
  };

  return (
    <div className="col-md-6">
      <label htmlFor="selectDate" className="form-label">
        Select Dates*
      </label>
      <div className="custom-calendar-wrapper">
        <DatePicker
          selected={null}
          onChange={() => {}}
          onSelect={handleDateClick}
          dayClassName={(date) =>
            isUnavailableDate(date)
              ? 'unavailable-date'
              : selected.some(
                  (selectedDate) =>
                    normalizeDate(selectedDate).getTime() === normalizeDate(date).getTime()
                )
              ? 'selected-date'
              : ''
          }
          minDate={today}
          maxDate={threeMonthsLater}
          inline
        />
      </div>
    </div>
  );
}

export default CustomCalendar;
