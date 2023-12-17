// Day.js

import React, { useState } from 'react';
import EventModal from './EventModal';

// Day component represents a single day in the calendar
const Day = ({ isCurrentDay, day, month, year, events, onEventClick, onAddEvent, onDeleteEvent }) => {
  // State to control the visibility of the event modal
  const [showEventModal, setShowEventModal] = useState(false);

  // Handler for clicking on a day
  const handleDayClick = () => {
    // Show event modal only if the day is valid (not part of the padding)
    if (day > 0){
      setShowEventModal(true);
    } 
  };

  // JSX rendering
  return (
    <div className={`day ${isCurrentDay ? 'current-day' : ''}`} onClick={handleDayClick}>
      {/* Display the day if it's a valid day */}
      {day > 0 ? day : ''}

      {/* Display events if there are any */}
      {events.length > 0 && (
        <div className="events">
          {events.map((event, index) => (
            <div key={index} className="event">
              {event.title}
            </div>
          ))}
        </div>
      )}

      {/* Event modal, displayed when showEventModal is true */}
      {showEventModal && (
        <EventModal
          day={day}
          month={month}
          year={year}
          events={events}
          onClose={() => setShowEventModal(false)}
          onEventClick={onEventClick}
          onAddEvent={onAddEvent}
          onDeleteEvent={onDeleteEvent}
        />
      )}
    </div>
  );
};

export default Day;
