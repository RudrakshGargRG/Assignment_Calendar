
import React, { useState } from 'react';
import EventModal from './EventModal';

const Day = ({ isCurrentDay, day, events, onEventClick, onAddEvent, onDeleteEvent }) => {
  const [showEventModal, setShowEventModal] = useState(false);

  const handleDayClick = () => {
    console.log("abc")
    setShowEventModal(true);
  };

  console.log(showEventModal);

  return (
    <div className={`day ${isCurrentDay ? 'current-day' : ''}`} onClick={handleDayClick}>
      {day > 0 ? day : ''}
      {showEventModal && (
        <EventModal
          day={day}
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