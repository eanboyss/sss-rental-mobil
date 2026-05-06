import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TambahMobil = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  // Satpam: Cuma Admin yang boleh masuk
  if (role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1 style={{ color: '#ff5252', fontSize: '4rem' }}>ACCESS DENIED.</h1>
        <p style={{ color: '#888', fontSize: '1.2rem' }}>Halaman ini dikunci cuma buat Admin SSS.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: '#333', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>BALIK KE BERANDA</button>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    nama_mobil: '', merk: '', harga: '', platNomor: '', gambar: '', status: 'tersedia'
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTambah = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sss-rental-mobil.vercel.app/api/mobil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('🔥 Mobil sukses dimasukin ke garasi!');
        navigate('/'); // Balik ke Home
      } else {
        alert('Gagal nambah mobil, periksa data lu.');
      }
    } catch (error) {
      alert('Gagal koneksi ke server.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      
      <div style={{ backgroundColor: '#111', padding: '40px', border: '2px solid #333', boxShadow: '8px 8px 0px #333' }}>
        
        <h1 style={{ fontSize: '3rem', color: '#fff', margin: '0 0 10px 0' }}>+ TAMBAH ARMADA</h1>
        <p style={{ color: '#888', textTransform: 'uppercase', marginBottom: '30px', letterSpacing: '1px' }}>Masukin data mobil baru ke garasi lu.</p>

        <form onSubmit={handleTambah} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: '#ffeb3b', fontWeight: 'bold' }}>NAMA MOBIL</label>
              <input type="text" name="nama_mobil" placeholder="Misal: Innova Reborn" onChange={handleInput} required style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #444' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: '#ffeb3b', fontWeight: 'bold' }}>MERK</label>
              <input type="text" name="merk" placeholder="Misal: Toyota" onChange={handleInput} required style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #444' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: '#ffeb3b', fontWeight: 'bold' }}>HARGA SEWA / HARI (Rp)</label>
              <input type="number" name="harga" placeholder="Misal: 600000" onChange={handleInput} required style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #444' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: '#ffeb3b', fontWeight: 'bold' }}>PLAT NOMOR</label>
              <input type="text" name="platNomor" placeholder="Misal: B 1234 SSS" onChange={handleInput} required style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #444' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#ffeb3b', fontWeight: 'bold' }}>LINK GAMBAR (URL)</label>
            <input type="text" name="gambar" placeholder="Tempel link gambar dari Google di sini..." onChange={handleInput} required style={{ padding: '15px', backgroundColor: '#000', color: '#fff', border: '1px solid #444' }} />
          </div>

          <button type="submit" style={{ 
            padding: '20px', 
            backgroundColor: '#fff', 
            color: '#000', 
            border: 'none', 
            fontWeight: '900', 
            fontSize: '1.2rem',
            cursor: 'pointer',
            marginTop: '20px',
            textTransform: 'uppercase'
          }}>
            SIMPAN KE GARASI
          </button>
        </form>

      </div>
    </div>
  );
};

export default TambahMobil;