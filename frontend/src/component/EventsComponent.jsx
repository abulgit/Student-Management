import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

/*   useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/get-events');
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } */

  return (
    <div className="overflow-y-scroll max-h-60 space-y-4 px-4">
{/*       {events.map((event) => (
        <div key={event.id} className="p-4 border rounded-lg shadow-md">
          <h3 className="font-bold">{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {event.date}</p>
        </div>
      ))} */}
      <p className='text-4xl'>No events to show.</p>
    </div>
  );
};

export default EventsComponent;
