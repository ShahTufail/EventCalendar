import React, { useState } from 'react';
import moment from 'moment';

function EventDialog({ isOpen, onClose, onSave, event }) {
  const [title, setTitle] = useState(event ? event.title : '');
  const [date, setDate] = useState(event ? moment(event.date).format('YYYY-MM-DD') : '');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, date });
    setTitle('');
    setDate('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>{event ? 'Edit Event' : 'New Event'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={handleTitleChange} required />
          </label>
          <label>
            Date:
            <input type="date" value={date} onChange={handleDateChange} required />
          </label>
          <div className="dialog-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">{event ? 'Update' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EventDialog;

