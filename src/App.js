import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './pages/login';
import Users from './pages/users';
import Receptions from './pages/pationts';
import Doctors from './pages/doctors';

function App() {
  return (
    <div className="App"> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs" element={<Receptions />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
