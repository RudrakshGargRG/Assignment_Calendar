// src/components/EventModal.js
import React, { useState } from 'react';

const EventModal = ({ day, events, onClose, onEventClick, onAddEvent, onDeleteEvent }) => {
  const [eventTitle, setEventTitle] = useState('');

  const handleAddEvent = () => {
    // Add the new event
    onAddEvent(eventTitle);
    setEventTitle('');
  };

  const handleDeleteEvent = (event) => {
    // Handle delete event
    onDeleteEvent(event);
  };

  return (
    <div className="event-modal">
      <div className="event-modal-content">
        
        <h2>Events on {day}</h2>
        
        {events.length === 0 ? (
          <p>No events for this day</p>
        ) : (
          <ol>
          {events.map((event, index) => (
            <li key={index} onClick={() => onEventClick(event)}>
              {event.title}
              <button onClick={() => handleDeleteEvent(event)}>Delete</button>
            </li>
          ))}
      </ol>
        )}
        <div className="add-event">
          <label>Add Event:</label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <button onClick={handleAddEvent}>Add Event</button>
          <button className="close" onClick={(e)=>{onClose(); e.stopPropagation();}}>x</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
