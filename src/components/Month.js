
import React from 'react';

const Month = ({ monthDate, isCurrentMonth, currentMonthRef, weekdays, renderDaysInMonth }) => (
  <div
    className={`month ${isCurrentMonth ? 'current-month' : ''}`}
    ref={currentMonthRef}
  >
    <h3>
      {getMonthName(monthDate.getMonth())} {monthDate.getFullYear()}
    </h3>
    <div className="weekdays">
      {weekdays.map((day) => (
        <div key={day} className="weekday">
          {day}
        </div>
      ))}
    </div>
    {renderDaysInMonth}
  </div>
);

const getMonthName = (monthIndex) => {
  const monthDate = new Date(new Date().getFullYear(), monthIndex, 1);
  return monthDate.toLocaleDateString('default', { month: 'long' });
};

export default Month;

