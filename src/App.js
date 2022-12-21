import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './pages/login';
import HotelsList from './pages/hotels-list';
import CompaniesList from './pages/companies-list';
import Cleaners from './pages/my-cleaners';
import MyCheckers from './pages/my-checkers';
import Panel from './pages/panel';
import Levels from './pages/levels';
import Receptions from './pages/receptions';
import MaterialList from './pages/material-list';

function App() {
  return (
    <div className="App"> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelsList />} />
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/cleaners" element={<Cleaners />} />
        <Route path="/checkers" element={<MyCheckers />} />
        <Route path="/rooms" element={<Panel />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/receptions" element={<Receptions />} />
        <Route path="/materials" element={<MaterialList />} />
        <Route path="/companycheckers" element={<MyCheckers />} />
        <Route path="/companycleaners" element={<Cleaners />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
