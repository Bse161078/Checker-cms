import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './pages/login';
import HotelsList from './pages/hotels-list';
import CompaniesList from './pages/companies-list';

function App() {
  return (
    <div className="App"> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelsList />} />
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
