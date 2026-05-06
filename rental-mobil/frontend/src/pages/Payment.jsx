import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mobil, setMobil] = useState(null);

  useEffect(() => {
    const fetchMobil = async () => {
      try {
        const response = await fetch('https://sss-rental-mobil.vercel.app/api/mobil');
        const data = await response.json();
        const mobilPilihan = data.find((m) => m._id === id);
        setMobil(mobilPilihan);
      } catch (error) {
        console.error("Gagal narik data mobil bos:", error);
      }
    };
    fetchMobil();
  }, [id]);

  const handleBayar = async (e) => {
    e.preventDefault();
    
    const userStr = localStorage.getItem('user');
    const currentUser = userStr ? JSON.parse(userStr) : null;

    try {
      const response = await fetch(`https://sss-rental-mobil.vercel.app/api/mobil/${id}/sewa`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailPenyewa: currentUser.email })
      });

      if (response.ok) {
        alert('🔥 PEMBAYARAN SUKSES! Mobil resmi masuk garasi lu.');
        navigate('/'); 
      } else {
        alert('Gagal konfirmasi pembayaran, coba lagi!');
      }
    } catch (error) {
      alert('Sistem lagi down bos.');
    }
  };

  if (!mobil) return <h2 style={{ color: '#ffeb3b', textAlign: 'center', marginTop: '100px' }}>MEMUAT DATA PEMBAYARAN...</h2>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div style={{ backgroundColor: '#111', padding: '40px', width: '500px', border: '2px solid #333', boxShadow: '8px 8px 0px #ffeb3b', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ borderBottom: '2px solid #333', paddingBottom: '15px', marginBottom: '10px' }}>
          <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#fff' }}>CHECKOUT SYSTEM</h2>
          <p style={{ color: '#888', margin: '5px 0 0 0', textTransform: 'uppercase', fontSize: '0.9rem' }}>Selesaikan pembayaran lu, bos.</p>
        </div>

        <div style={{ backgroundColor: '#000', padding: '15px', border: '1px solid #444' }}>
          <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>ITEM:</p>
          <h3 style={{ color: '#fff', margin: '5px 0' }}>{mobil.nama_mobil} ({mobil.platNomor})</h3>
          <p style={{ color: '#ffeb3b', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
            Rp {mobil.harga.toLocaleString('id-ID')} <span style={{ fontSize: '1rem', color: '#888' }}>/ Hari</span>
          </p>
        </div>

        <div style={{ padding: '15px', border: '1px dashed #ffeb3b' }}>
          <p style={{ color: '#fff', margin: 0, fontWeight: 'bold' }}>TRANSFER KE BANK SSS:</p>
          <h2 style={{ color: '#ffeb3b', margin: '10px 0', letterSpacing: '2px' }}>BCA 123-456-7890</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}>A.N. BOS SSS RENTAL</p>
        </div>

        <form onSubmit={handleBayar} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#ffeb3b', fontWeight: 'bold', fontSize: '0.9rem' }}>UPLOAD BUKTI TRANSFER (DUMMY)</label>
            <input type="file" required style={{ padding: '10px', backgroundColor: '#000', color: '#fff', border: '1px solid #444', outline: 'none' }} />
          </div>
          <button type="submit" style={{ padding: '18px', backgroundColor: '#ffeb3b', color: '#000', border: 'none', fontWeight: '900', fontSize: '1.2rem', cursor: 'pointer', textTransform: 'uppercase', transition: '0.3s' }}>
            KONFIRMASI & SEWA
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;