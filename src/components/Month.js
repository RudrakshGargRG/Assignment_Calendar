import React from 'react';

// Month component represents a single month in the calendar
const Month = ({ monthDate, isCurrentMonth, currentMonthRef, weekdays, renderDaysInMonth }) => (
  <div
    className={`month ${isCurrentMonth ? 'current-month' : ''}`}
    ref={currentMonthRef}
  >
    {/* Display the name and year of the month */}
    <h3>
      {getMonthName(monthDate.getMonth())} {monthDate.getFullYear()}
    </h3>
    
    {/* Display weekdays */}
    <div className="weekdays">
      {weekdays.map((day) => (
        <div key={day} className="weekday">
          {day}
        </div>
      ))}
    </div>
    
    {/* Render days for the month */}
    {renderDaysInMonth}
  </div>
);

// Helper function to get the name of the month based on the index
const getMonthName = (monthIndex) => {
  const monthDate = new Date(new Date().getFullYear(), monthIndex, 1);
  return monthDate.toLocaleDateString('default', { month: 'long' });
};

export default Month;

