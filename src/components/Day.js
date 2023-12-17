
import React from 'react';

const Day = ({ isCurrentDay, day }) => (
  <div
    className={`day ${isCurrentDay ? 'current-day' : ''}`}
  >
    {day > 0 ? day : ''}
  </div>
);

export default Day;
