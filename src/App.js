import React, { useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);

  const handleAddEvent = () => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = {
        id: Date.now(),
        title: title,
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  return (
    <div className="App">
      <h1>My Calendar</h1>
      <button onClick={handleAddEvent}>Add Event</button>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title}
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
