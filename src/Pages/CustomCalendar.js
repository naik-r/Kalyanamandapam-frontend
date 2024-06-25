import React, { useState ,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomCalendar.css'; // Custom CSS for styling available andunavailable dates

function CustomCalendar({ selectedDates, setSelectedDates, unavailableDates = [] }) {
  // const [unavailableDates, setUnavailableDates] = useState([]);
  const [selected, setSelected] = useState(selectedDates);

  useEffect(() => {
    setSelectedDates(selected);
  }, [selected, setSelectedDates]);

  const isUnavailableDate = date => {
    return unavailableDates.some(
      unavailableDate => unavailableDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );
  };

   const getDateClass = date => {
    if (isUnavailableDate(date)) return 'unavailable-date';
    if (selected.some(selectedDate => selectedDate.toISOString().split('T')[0] === date.toISOString().split('T')[0])) {
      return 'selected-date';
    }
    return '';
  };
  const normalizeDate = date => {
    const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return normalizedDate;
  };

  const handleDateClick = date => {
    if (isUnavailableDate(date)) {
      return;
    }

    const normalizedDate = normalizeDate(date);
    
    const index = selected.findIndex(selectedDate => selectedDate.toISOString().split('T')[0] === normalizedDate.toISOString().split('T')[0]);

    
  // const handleDateChange = date => {
  //   const index = selectedDates.findIndex(selectedDate =>
  //     selectedDate.toDateString() === date.toDateString()
  //   );

    let updatedSelectedDates;
    if (index !== -1) {
      // Date already selected, remove it
      updatedSelectedDates = [...selectedDates];
      updatedSelectedDates.splice(index, 1);
      // setSelectedDates(updatedSelectedDates);

      // Remove from unavailable dates
//       setUnavailableDates(
//         unavailableDates.filter(
//           unavailableDate => unavailableDate.toDateString() !==
// date.toDateString()
//         )
//       );
    } else {
      // Date not selected, add it
      updatedSelectedDates = [...selectedDates, normalizedDate];
      // setSelectedDates(updatedSelectedDates);
      // setUnavailableDates([...unavailableDates, date]);
    }
    setSelected(updatedSelectedDates);
    // Log the selected dates to the console
//     console.log('Selected dates:', updatedSelectedDates.map(d =>
// d.toDateString()));
  };

  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

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
             dayClassName={date => getDateClass(date)}
             minDate={today}
             maxDate={threeMonthsLater}
             inline
             required
        />
      </div>
    </div>
  );
}

export default CustomCalendar;