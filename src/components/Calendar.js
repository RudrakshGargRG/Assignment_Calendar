
import React, { useRef, useEffect, useState } from 'react';
import Month from './Month';
import Day from './Day';
import '../styles/Calendar.css';

const Calendar = () => {
  const currentDate = new Date();
  const currentMonthRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [events, setEvents] = useState({});

  useEffect(() => {
    // Scroll to the current month upon initial load
    if (currentMonthRef.current) {
      currentMonthRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedMonth]);

  const isCurrentMonth = (monthOffset) => currentDate.getMonth() + monthOffset === selectedMonth;
  const getMonthName = (monthIndex) => {
    const monthDate = new Date(currentDate.getFullYear(), monthIndex, 1);
    return monthDate.toLocaleDateString('default', { month: 'long' });
  };

  const handleMonthChange = (e) => {
    const selectedMonth = parseInt(e.target.value, 10);
    const currentYear = currentDate.getFullYear();
  
    // Calculate the options dynamically based on the rendered months
    const renderedMonths = Array.from({ length: 13 }).map((_, index) => {
      const monthOffset = index - 6;
      return new Date(currentYear, selectedMonth + monthOffset, 1);
    });
  
    // Check if the selected month is in the current rendered months
    const selectedYear = renderedMonths[selectedMonth].getFullYear();
  
    setSelectedMonth(selectedMonth);
    setSelectedDate(new Date(selectedYear, selectedMonth, 1));
  };

  const getMonthIdentifier = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 because getMonth() returns a zero-based index
    return `${year}-${month.toString().padStart(2, '0')}`;
  };

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

  const isCurrentDay = (monthOffset, day) =>
    currentDate.getMonth() + monthOffset === currentDate.getMonth() && currentDate.getDate() === day;

    const getEventsForDay = (monthIdentifier, day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return events[monthIdentifier]?.filter((event) => isSameDay(event.date, date)) || [];
      };

  const handleEventClick = (event) => {
    // Handle event click (e.g., show event details, allow deletion)
    console.log('Event clicked:', event);
  };

  const handleAddEvent = (monthIdentifier, day, title) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const newEvent = { date, title };
  
    // Update events using the month identifier
    const updatedEvents = { ...events };
    updatedEvents[monthIdentifier] = [...(updatedEvents[monthIdentifier] || []), newEvent];
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (eventToDelete) => {
    // Filter out the event to delete
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
  };

  const isSameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  return (
    <div className="calendar-container">

        <div className='header1'>
            {/* <h1>Event Calendar</h1> */}
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

