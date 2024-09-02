import { Link } from 'react-router-dom';

function EventNavBar() {
  return (
    <nav className="bg-gray-100 p-4 shadow-md">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            All Events
          </Link>
        </li>
        <li>
          <Link to="/create" className="text-blue-600 hover:text-blue-800 font-semibold">
            Create Event
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default EventNavBar;