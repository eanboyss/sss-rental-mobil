import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [daftarMobil, setDaftarMobil] = useState([]);
  const navigate = useNavigate();

  // Cek siapa yang lagi login (Buat nentuin dia Admin atau bukan)
  const userStr = localStorage.getItem('user');
  const currentUser = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    const ambilDataMobil = async () => {
      try {
        const response = await fetch('https://sss-rental-mobil.vercel.app/api/mobil');
        const data = await response.json();
        setDaftarMobil(data);
      } catch (error) {
        console.error("Gagal narik data dari database, bos:", error);
      }
    };
    ambilDataMobil();
  }, []);

  const handleSewa = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("WOY! Akses ditolak. Login dulu bos sebelum nyewa armada.");
      navigate('/login');
    } else {
      navigate(`/payment/${id}`);
    }
  };

  const handleKembali = async (id, namaMobil) => {
    const konfirmasi = window.confirm(`Lu yakin mau ngembaliin ${namaMobil} ke garasi SSS?`);
    if (konfirmasi) {
      try {
        const response = await fetch(`https://sss-rental-mobil.vercel.app/api/mobil/${id}/kembali`, {
          method: 'PUT',
        });
        if (response.ok) {
          alert(`🔥 MANTAP! ${namaMobil} udah masuk garasi lagi dan siap disewa!`);
          window.location.reload(); 
        } else {
          alert("Gagal ngembaliin mobil, coba lagi ntar.");
        }
      } catch (error) {
        console.error("Error sistem:", error);
      }
    }
  };

  // FUNGSI BARU: HAPUS MOBIL (KHUSUS ADMIN)
  const handleHapus = async (id, namaMobil) => {
    const konfirmasi = window.confirm(`AWAS BOS! Lu beneran mau ngapus ${namaMobil} dari garasi SSS secara permanen?`);
    if (konfirmasi) {
      try {
        const response = await fetch(`https://sss-rental-mobil.vercel.app/api/mobil/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert(`💥 DAAARR! ${namaMobil} resmi dihapus dari garasi.`);
          window.location.reload();
        } else {
          alert("Gagal ngapus mobil bos.");
        }
      } catch (error) {
        console.error("Error sistem:", error);
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#000', padding: '50px 30px', border: '3px solid #333', marginBottom: '40px', boxShadow: '10px 10px 0px #111', position: 'relative', overflow: 'hidden' }}>
        <h1 style={{ fontSize: '3.5rem', margin: 0, color: '#fff', lineHeight: '1' }}># RIDE THE STREETS.</h1>
        <p style={{ color: '#ffeb3b', fontSize: '1.2rem', marginTop: '15px', fontWeight: 'bold', letterSpacing: '2px' }}>
          SSS RENTAL MOBIL — GASPOL TANPA BATAS.
        </p>
        <div style={{ position: 'absolute', bottom: '0', right: '0', width: '100px', height: '10px', backgroundColor: '#ffeb3b' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
        {daftarMobil.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px' }}>
             <h2 style={{ color: '#ffeb3b' }}>SEDANG MEMANASKAN MESIN DI GARASI...</h2>
          </div>
        ) : (
          daftarMobil.map((mobil) => (
            <div key={mobil._id} className="mobil-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
              
              {/* TOMBOL HAPUS KHUSUS ADMIN (MELAYANG DI POJOK KANAN ATAS GAMBAR) */}
              {currentUser && currentUser.role === 'admin' && (
                <button 
                  onClick={() => handleHapus(mobil._id, mobil.nama_mobil)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#ff5252',
                    color: '#fff',
                    border: '2px solid #000',
                    padding: '8px 12px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    zIndex: 10,
                    boxShadow: '3px 3px 0px #000',
                    fontSize: '0.8rem'
                  }}
                  title="Hapus Mobil Permanen"
                >
                  X HAPUS
                </button>
              )}

              <img src={mobil.gambar} alt={mobil.nama_mobil} style={{ width: '100%', height: '220px', objectFit: 'cover', border: '2px solid #333', filter: mobil.status === 'disewa' ? 'grayscale(100%)' : 'none' }} />
              
              <div style={{ padding: '5px' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>{mobil.nama_mobil}</h2>
                <p style={{ margin: '0', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Brand: <span style={{ color: '#eee' }}>{mobil.merk}</span></p>
                <p style={{ margin: '10px 0', color: '#ffeb3b', fontWeight: 'bold', fontSize: '1.5rem' }}>Rp {mobil.harga.toLocaleString('id-ID')} <span style={{ fontSize: '0.9rem', color: '#888' }}>/ HARI</span></p>
              </div>
              
              <div style={{ padding: '10px', backgroundColor: mobil.status === 'tersedia' ? '#1b5e20' : '#8b0000', color: '#fff', textAlign: 'center', fontWeight: 'bold', border: '2px solid #000', fontSize: '0.9rem' }}>
                {mobil.status === 'tersedia' ? '🟢 TERSEDIA' : '🔴 SUDAH DISEWA'}
              </div>

              {mobil.status === 'tersedia' ? (
                <button onClick={() => handleSewa(mobil._id)} style={{ padding: '18px', backgroundColor: '#ffeb3b', color: '#000', border: 'none', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: 'auto' }}>
                  SEWA SEKARANG
                </button>
              ) : (currentUser && mobil.penyewa === currentUser.email) ? (
                <button onClick={() => handleKembali(mobil._id, mobil.nama_mobil)} style={{ padding: '18px', backgroundColor: '#ff5252', color: '#fff', border: '2px solid #000', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', marginTop: 'auto', boxShadow: '4px 4px 0px #111' }}>
                  KEMBALIKAN ARMADA
                </button>
              ) : (
                <button disabled style={{ padding: '18px', backgroundColor: '#222', color: '#666', border: 'none', fontWeight: '900', fontSize: '1.1rem', cursor: 'not-allowed', marginTop: 'auto' }}>
                  🔴 DISEWA ORANG LAIN
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <footer style={{ marginTop: '100px', borderTop: '1px solid #333', padding: '30px 0', textAlign: 'center', color: '#555' }}>
        <p>© 2026 SSS RENTAL MOBIL — NO LIMITS, JUST RIDE.</p>
      </footer>
    </div>
  );
};

export default Home;