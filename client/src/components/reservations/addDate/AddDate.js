import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useValue } from '../../../context/ContextProvider';
import { Stack } from '@mui/material';

const AddDate = ({ gearId }) => {
  const { state: { dateRange }, updateDateRange, dispatch } = useValue();
  const [selectionRange, setSelectionRange] = useState({
    startDate: dateRange[0],
    endDate: dateRange[1],
    key: 'selection',
  });
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    if (gearId) {
      fetchReservedDates(gearId);
    }
  }, [gearId]);

  const fetchReservedDates = async (gearId) => {
    try {
      console.log('Fetching reserved dates for gear:', gearId);
      const response = await fetch(`http://localhost:5000/reservation/reserved-dates?gearId=${gearId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reserved dates');
      }
      const data = await response.json();
      console.log('Fetched reserved dates:', data);
      
      // Filter reserved dates for the specific gear
      const filteredDates = data.filter(reservation => reservation.gearId === gearId);
      console.log('Filtered reserved dates for gear:', gearId, filteredDates);
      
      setReservedDates(filteredDates);
    } catch (error) {
      console.error('Error fetching reserved dates:', error);
    }
  };

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    const isDateReserved = reservedDates.some(reservation => {
      const start = new Date(reservation.startDate).getTime();
      const end = new Date(reservation.endDate).getTime();
      const selectedStart = startDate.getTime();
      const selectedEnd = endDate.getTime();
      return (selectedStart >= start && selectedStart <= end) || (selectedEnd >= start && selectedEnd <= end);
    });

    if (!isDateReserved) {
      setSelectionRange(ranges.selection);
      updateDateRange([startDate, endDate]);
      dispatch({
        type: 'UPDATE_DATE_RANGE',
        payload: [startDate, endDate],
      });
    }
  };

  const renderDay = (dateItem) => {
    const timestamp = dateItem.getTime(); // Convert to timestamp
    const isReserved = reservedDates.some(reservation => {
      const start = new Date(reservation.startDate).getTime();
      const end = new Date(reservation.endDate).getTime();
      return timestamp >= start && timestamp <= end;
    });
  
    const isSelected = (
      selectionRange.startDate.getTime() <= timestamp &&
      selectionRange.endDate.getTime() >= timestamp
    );
  
    const dayContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 30,
      height: 30,
      borderRadius: '50%',
      backgroundColor: isReserved ? '#f0f0f0' : (isSelected ? '#b3e5fc' : 'transparent'),
      cursor: isReserved ? 'not-allowed' : 'pointer',
    };
  
    const dayNumberStyle = {
      color: isReserved ? '#888' : '#333',
    };
  
    return (
      <div style={dayContainerStyle}>
        <span style={dayNumberStyle}>{dateItem.getDate()}</span>
      </div>
    );
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 },
      }}
    >
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        className="custom-date-range-picker"
        dayContentRenderer={(dateItem) => renderDay(dateItem)}
      />
    </Stack>
  );
};

export default AddDate;
