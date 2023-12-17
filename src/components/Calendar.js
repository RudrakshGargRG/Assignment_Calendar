import React, { useRef, useEffect, useState } from 'react';
import Month from './Month';
import Day from './Day';
import '../styles/Calendar.css';

const Calendar = () => {
  // Initializations
  const currentDate = new Date();
  const currentMonthRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [events, setEvents] = useState({});

  // Effect to scroll to the current month on initial load or when month changes
  useEffect(() => {
    if (currentMonthRef.current) {
      currentMonthRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedMonth]);

  // Check if a given month is the currently selected month
  const isCurrentMonth = (monthOffset) => currentDate.getMonth() + monthOffset === selectedMonth;

  // Get the name of a month based on its index
  const getMonthName = (monthIndex) => {
    const monthDate = new Date(currentDate.getFullYear(), monthIndex, 1);
    return monthDate.toLocaleDateString('default', { month: 'long' });
  };

  // Handle month change in the dropdown
  const handleMonthChange = (e) => {
    const selectedMonth = parseInt(e.target.value, 10);
    setSelectedMonth(selectedMonth);
  };

  // Get a unique identifier for a month
  const getMonthIdentifier = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 because getMonth() returns a zero-based index
    return `${year}-${month.toString().padStart(2, '0')}`;
  };

  // Render days in a month
  const renderDaysInMonth = (monthOffset) => {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
    const monthIdentifier = getMonthIdentifier(monthDate);
    const startingDayIndex = monthDate.getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset + 1, 0).getDate();
    const days = Array.from({ length: startingDayIndex + daysInMonth }, (_, dayIndex) => dayIndex + 1 - startingDayIndex);
  
    const handleDeleteEvent = (eventToDelete) => {
      // Update events using the month identifier
      const updatedEvents = { ...events };
      updatedEvents[monthIdentifier] = updatedEvents[monthIdentifier].filter((event) => event !== eventToDelete);
      setEvents(updatedEvents);
    };
  
    return (
      <div className="days">
        {days.map((day) => (
          <Day
            key={day}
            isCurrentDay={isCurrentDay(monthOffset, day)}
            day={day}
            month={monthDate.getMonth()}
            year={monthDate.getFullYear()}
            events={getEventsForDay(monthIdentifier, day)}
            onEventClick={(event) => handleEventClick(event)}
            onAddEvent={(title) => handleAddEvent(monthIdentifier, day, title)}
            onDeleteEvent={handleDeleteEvent}
          />
        ))}
      </div>
    );
  };

  // Check if a given day is the current day
  const isCurrentDay = (monthOffset, day) =>
    currentDate.getMonth() + monthOffset === currentDate.getMonth() && currentDate.getDate() === day;

  // Get events for a specific day
  const getEventsForDay = (monthIdentifier, day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return events[monthIdentifier]?.filter((event) => isSameDay(event.date, date)) || [];
  };

  // Handle event click
  const handleEventClick = (event) => {
    // Handle event click (e.g., show event details, allow deletion)
    console.log('Event clicked:', event);
  };

  // Handle adding a new event
  const handleAddEvent = (monthIdentifier, day, title) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const newEvent = { date, title };
  
    // Update events using the month identifier
    const updatedEvents = { ...events };
    updatedEvents[monthIdentifier] = [...(updatedEvents[monthIdentifier] || []), newEvent];
    setEvents(updatedEvents);
  };

  // Handle deleting an event
  const handleDeleteEvent = (eventToDelete) => {
    // Filter out the event to delete
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
  };

  // Check if two dates represent the same day
  const isSameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  // JSX rendering
  return (
    <div className="calendar-container">
      <div className='header1'>
        {/* Month selection dropdown */}
        <div>
          <label htmlFor="monthSelect">Select Month: </label>
          <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }).map((_, index) => (
              <option key={index} value={index}>
                {getMonthName(index)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Calendar rendering */}
      <div className="calendar">
        {Array.from({ length: 13 }).map((_, index) => {
          const monthOffset = index - 6;
          const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);

          return (
            <Month
              key={index}
              monthDate={monthDate}
              isCurrentMonth={isCurrentMonth(monthOffset)}
              currentMonthRef={isCurrentMonth(monthOffset) ? currentMonthRef : null}
              weekdays={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
              renderDaysInMonth={renderDaysInMonth(monthOffset)}
              onDeleteEvent={handleDeleteEvent}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
