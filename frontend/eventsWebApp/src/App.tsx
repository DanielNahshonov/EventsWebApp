import './App.css';
import AllEvents from './components/AllEvents';
import EventNavBar from './components/EventNavBar';
import CreateEvent from './components/CreateEvent';
import UpdateEvent from './components/UpdateEvent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForEvent from './components/RegistrationForEvent';

function App() {
  return (
    <Router>
      <div>
        <EventNavBar />
        <Routes>
          <Route path="/" element={<AllEvents />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/update/:id" element={<UpdateEvent />} />
          <Route path="/registration/:id" element={<RegistrationForEvent />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;