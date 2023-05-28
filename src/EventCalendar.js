import React, { useState } from 'react';
import EventDialog from './EventDialog';
import { subMonths, addMonths, format, startOfMonth, endOfMonth, isSameDay, addDays } from 'date-fns';
import './EventCalendar.css';

function EventCalendar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = JSON.parse(localStorage.getItem('events')) || [];

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveEvent = (event) => {
    const updatedEvents = selectedEvent
      ? events.map((e) => (e.id === selectedEvent.id ? { ...e, title: event.title, date: event.date } : e))
      : [...events, { id: Date.now(), ...event }];

    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setSelectedEvent(null);
    setIsDialogOpen(false);
  };

  const handleDeleteEvent = (event) => {
    setSelectedEvent(event);
    
    setIsConfirmOpen(true);
    setIsDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setSelectedEvent(null);
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    const updatedEvents = events.filter((e) => e.id !== selectedEvent.id);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setSelectedEvent(null);
    setIsConfirmOpen(false);
  };

  const handlePreviousMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  const monthStartDate = startOfMonth(selectedDate);
  const monthEndDate = endOfMonth(selectedDate);

  const filteredEvents = events.filter(
    (event) => event.date >= format(monthStartDate, 'yyyy-MM-dd') && event.date <= format(monthEndDate, 'yyyy-MM-dd')
  );

  const renderCalendarDays = () => {
    const days = [];
    const startDate = startOfMonth(selectedDate);
    const endDate = endOfMonth(selectedDate);

    let currentDate = startDate;

    while (currentDate <= endDate) {
      const isToday = isSameDay(currentDate, new Date());

      const dayEvents = filteredEvents.filter((event) => isSameDay(new Date(event.date), currentDate));

      days.push(
        <div key={currentDate} className={`calendar-day ${isToday ? 'today' : ''}`}>
          <span className="day-number">{format(currentDate, 'd')}</span>
          <div className="event-list">
            {dayEvents.map((event) => (
              <div key={event.id} className="event-card" onClick={() => handleEditEvent(event)}>
                <div className="event-title">{event.title}</div>
                <div className="event-date">{format(new Date(event.date), 'MMMM d, yyyy')}</div>
              </div>
            ))}
          </div>
        </div>
      );

      currentDate = addDays(currentDate, 1);
    }

    return days;
  };

  return (
    <div className="event-calendar">
      <div className="calendar-header">
        <button className="nav-button" onClick={handlePreviousMonth}>
          &lt;
        </button>
        <h2 className="month-year">{format(selectedDate, 'MMMM yyyy')}</h2>
        <button className="nav-button" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <div className="calendar-grid">{renderCalendarDays()}</div>
      <button className="add-event-button" onClick={handleAddEvent}>
        Add Event
      </button>
      {isDialogOpen && (
        <EventDialog isOpen={isDialogOpen} onClose={handleCloseDialog} onSave={handleSaveEvent} event={selectedEvent} onDelete={handleDeleteEvent}/>
      )}
      {isConfirmOpen && (
        <div className="confirm-delete">
          <p className="confirm-message">Are you sure you want to delete this event?</p>
          <div className="confirm-buttons">
            <button className="confirm-button" onClick={handleCancelDelete}>
              Cancel
            </button>
            <button className="confirm-button" onClick={handleConfirmDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCalendar;
