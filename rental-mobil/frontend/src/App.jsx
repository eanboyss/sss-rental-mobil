import Payment from './pages/Payment';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TambahMobil from './pages/TambahMobil';
import Navbar from './components/Navbar'; // <-- Ini dia yang bikin Navbarnya pinter
import './App.css';

function App() {
  return (
    <Router>
      {/* Pasang Navbar utama di sini, di luar Routes biar selalu muncul */}
      <Navbar />

      <div>
        <Routes>
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Ubah path jadi /tambah biar nyambung sama tombol di Navbar */}
          <Route path="/tambah" element={<TambahMobil />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;