import React, { useState } from 'react';
import '../styles/EventModal.css'; // Make sure to import your EventModal styles

const EventModal = ({ day, month, year, events, onClose, onEventClick, onAddEvent, onDeleteEvent }) => {
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
        <h2>Events on {day}-{month}-{year}</h2>
        
        {events.length === 0 ? (
          <p>No events for this day</p>
        ) : (
          <ol>
            {events.map((event, index) => (
              <li key={index} onClick={() => onEventClick(event)}>
                <span>{event.title}</span>
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
        </div>

        <button className="close" onClick={(e) => { onClose(); e.stopPropagation(); }}>x</button>
      </div>
    </div>
  );
};

export default EventModal;
