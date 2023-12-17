// Day.js

import React, { useState } from 'react';
import EventModal from './EventModal';

const Day = ({ isCurrentDay, day, month, year, events, onEventClick, onAddEvent, onDeleteEvent }) => {
  const [showEventModal, setShowEventModal] = useState(false);

  
  const handleDayClick = () => {
    if (day > 0){
      setShowEventModal(true);
    } 
  };

  return (
    <div className={`day ${isCurrentDay ? 'current-day' : ''}`} onClick={handleDayClick}>
      {day > 0 ? day : ''}
      {events.length > 0 && (
        <div className="events">
          {events.map((event, index) => (
            <div key={index} className="event">
              {event.title}
            </div>
          ))}
        </div>
      )}
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
