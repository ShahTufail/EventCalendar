import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EventDialog.css';

function EventDialog({ isOpen, onClose, onSave, event, onDelete }) {
  const [title, setTitle] = useState(event ? event.title : '');
  const [date, setDate] = useState(event ? new Date(event.date) : new Date());

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSave = () => {
    onSave({ id: event ? event.id : null, title, date: date.toISOString().split('T')[0] });
  };

  const handleDelete = () => {
    onDelete({ id: event ? event.id : null, title, date: date.toISOString().split('T')[0] });
  }

  return (
    <div className={`event-dialog ${isOpen ? 'open' : ''}`}>
      <div className="dialog-content">
        <h2 className="dialog-title">{event ? 'Edit Event' : 'Add Event'}</h2>
        <input
          type="text"
          className="event-title-input"
          value={title}
          onChange={handleTitleChange}
          placeholder="Event Title"
        />
        <DatePicker className="event-date-picker" selected={date} onChange={handleDateChange} />
        <div className="dialog-buttons">
          <button className="save-button" onClick={handleSave}>
            {event ? 'Save' : 'Add'}
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="cancel-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDialog;
