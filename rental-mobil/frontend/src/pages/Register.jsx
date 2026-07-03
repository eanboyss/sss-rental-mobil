import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  // 1. Tambahin 'no_hp' di state awal biar datanya nyambung
  const [formData, setFormData] = useState({ nama: '', no_hp: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sss-rental-mobil.vercel.app/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        alert('🔥 Welcome to the club! Akun berhasil dibuat. Gas login sekarang.');
        navigate('/login'); 
      } else {
        setErrorMsg(data.message || 'Gagal daftar, email mungkin udah kepake bos!');
      }
    } catch (error) {
      setErrorMsg('Server lagi down atau gagal konek.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      
      {/* Kotak Register Style Grunge */}
      <div style={{ 
        backgroundColor: '#111', 
        padding: '40px', 
        width: '450px', 
        border: '2px solid #333', 
        boxShadow: '-8px 8px 0px #ffeb3b',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        
        <div style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '10px' }}>
          <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#fff' }}>JOIN THE CREW</h2>
          <p style={{ color: '#888', margin: '5px 0 0 0', textTransform: 'uppercase', fontSize: '0.9rem' }}>Bikin Akun Buat Sewa Mobil.</p>
        </div>

        {errorMsg && <p style={{ color: '#000', backgroundColor: '#ff5252', padding: '10px', fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>{errorMsg}</p>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* NAMA LENGKAP */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#ffeb3b', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>NAMA LENGKAP</label>
            <input 
              type="text" 
              name="nama" 
              placeholder="Nama tongkrongan lu..."
              onChange={handleInput} 
              required
              style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #444', outline: 'none' }} 
            />
          </div>
          
          {/* NO. WHATSAPP (Udah dibenerin) */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#ffeb3b', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>NO. WHATSAPP</label>
            <input 
              type="tel" 
              name="no_hp" 
              placeholder="0812xxxx..."
              onChange={handleInput} 
              required
              style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #444', outline: 'none' }} 
            />
          </div>

          {/* EMAIL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#ffeb3b', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>EMAIL</label>
            <input 
              type="email" 
              name="email" 
              placeholder="email@jalan.com"
              onChange={handleInput} 
              required
              style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #444', outline: 'none' }} 
            />
          </div>

          {/* PASSWORD */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#ffeb3b', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>PASSWORD</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Minimal 6 karakter"
              onChange={handleInput} 
              required
              style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #444', outline: 'none' }} 
            />
          </div>

          <button type="submit" style={{ 
            padding: '18px', 
            backgroundColor: '#fff', 
            color: '#000', 
            border: 'none', 
            fontWeight: '900', 
            fontSize: '1.2rem',
            cursor: 'pointer',
            marginTop: '10px',
            textTransform: 'uppercase',
            transition: '0.3s'
          }}>
            DAFTAR SEKARANG
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#888', marginTop: '10px', fontSize: '0.9rem' }}>
          Udah punya akses? <Link to="/login" style={{ color: '#ffeb3b', textDecoration: 'none', fontWeight: 'bold' }}>LOGIN DI SINI</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;