
import React, { useRef, useEffect, useState } from 'react';
import Month from './Month';
import Day from './Day';
import '../styles/Calendar.css';

const Calendar = () => {
  const currentDate = new Date();
  const currentMonthRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Scroll to the current month upon initial load
    if (currentMonthRef.current) {
      currentMonthRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const isCurrentMonth = (monthOffset) => currentDate.getMonth() + monthOffset === currentDate.getMonth();

  const getMonthName = (monthIndex) => {
    const monthDate = new Date(currentDate.getFullYear(), monthIndex, 1);
    return monthDate.toLocaleDateString('default', { month: 'long' });
  };

  const renderDaysInMonth = (monthOffset) => {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
    const startingDayIndex = monthDate.getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset + 1, 0).getDate();
    const days = Array.from({ length: startingDayIndex + daysInMonth }, (_, dayIndex) => dayIndex + 1 - startingDayIndex);

    return (
      <div className="days">
        {days.map((day) => (
          <Day
            key={day}
            isCurrentDay={isCurrentDay(monthOffset, day)}
            day={day}
          />
        ))}
      </div>
    );
  };

  const isCurrentDay = (monthOffset, day) =>
    currentDate.getMonth() + monthOffset === currentDate.getMonth() && currentDate.getDate() === day;

  return (
    <div className="calendar-container">
      <h1>Custom Scrollable Calendar</h1>
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
