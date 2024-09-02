import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  numberOfTickets: number;
}

export default function AllEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const goToRegistrationForm = (eventId: string) => {
    navigate(`/registration/${eventId}`); // Navigate to the registration form with the eventId
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Events</h1>
      <ul className="space-y-6">
        {events.map((event) => (
          <li key={event._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <p className="text-gray-600 mb-2">Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2">End Date: {new Date(event.endDate).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-4">Number of Tickets: {event.numberOfTickets}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => goToRegistrationForm(event._id)}
            >
              Register
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}