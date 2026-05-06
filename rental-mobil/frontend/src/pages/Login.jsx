import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sss-rental-mobil.vercel.app/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('🔥 Akses Diterima. Welcome to SSS Rental!');
        window.location.href = '/'; // Pake window.location biar navbar ikut kereload
      } else {
        setErrorMsg(data.message || 'Email atau password salah bos!');
      }
    } catch (error) {
      setErrorMsg('Gagal konek ke server.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      
      {/* Kotak Login Style Grunge */}
      <div style={{ 
        backgroundColor: '#111', 
        padding: '40px', 
        width: '400px', 
        border: '2px solid #333', 
        boxShadow: '8px 8px 0px #ffeb3b',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        
        <div style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '10px' }}>
          <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#fff' }}>SYSTEM ACCESS</h2>
          <p style={{ color: '#888', margin: '5px 0 0 0', textTransform: 'uppercase', fontSize: '0.9rem' }}>Masukkan Kredensial Lu.</p>
        </div>

        {errorMsg && <p style={{ color: '#000', backgroundColor: '#ff5252', padding: '10px', fontWeight: 'bold', textAlign: 'center', border: '1px solid #000' }}>{errorMsg}</p>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#ffeb3b', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>EMAIL / USERNAME</label>
            <input 
              type="email" 
              name="email" 
              placeholder="admin@sss.com"
              onChange={handleInput} 
              required
              style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #444', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#ffeb3b', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>PASSWORD</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••"
              onChange={handleInput} 
              required
              style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #444', outline: 'none' }} 
            />
          </div>

          <button type="submit" style={{ 
            padding: '18px', 
            backgroundColor: '#ffeb3b', 
            color: '#000', 
            border: 'none', 
            fontWeight: '900', 
            fontSize: '1.2rem',
            cursor: 'pointer',
            marginTop: '10px',
            textTransform: 'uppercase'
          }}>
            MASUK
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;