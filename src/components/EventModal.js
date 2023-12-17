import React, { useState } from 'react';

// EventModal component represents a modal for displaying and managing events for a specific day
const EventModal = ({ day, month, year, events, onClose, onEventClick, onAddEvent, onDeleteEvent }) => {
  // State to store the title of the new event
  const [eventTitle, setEventTitle] = useState('');

  // Handler for adding a new event
  const handleAddEvent = () => {
    // Add the new event and reset the eventTitle state
    onAddEvent(eventTitle);
    setEventTitle('');
  };

  // Handler for deleting an event
  const handleDeleteEvent = (event) => {
    // Delete the specified event
    onDeleteEvent(event);
  };

  // JSX rendering
  return (
    <div className="event-modal">
      <div className="event-modal-content">
        {/* Display the date for which events are shown */}
        <h2>Events on {day}-{month}-{year}</h2>
        
        {/* Display events or a message if there are no events */}
        {events.length === 0 ? (
          <p>No events for this day</p>
        ) : (
          <ol>
            {/* List of events with delete button */}
            {events.map((event, index) => (
              <li key={index} onClick={() => onEventClick(event)}>
                <span>{event.title}</span>
                <button onClick={() => handleDeleteEvent(event)}>Delete</button>
              </li>
            ))}
          </ol>
        )}

        {/* Section to add a new event */}
        <div className="add-event">
          <label>Add Event:</label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>

        {/* Close button for the modal */}
        <button className="close" onClick={(e) => { onClose(); e.stopPropagation(); }}>x</button>
      </div>
    </div>
  );
};

export default EventModal;
