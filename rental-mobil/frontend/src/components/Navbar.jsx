import { Link } from 'react-router-dom';

const Navbar = () => {
  // Cek isi brankas browser (localStorage) buat tau siapa yang lagi login
  const role = localStorage.getItem('role');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // FITUR LOGOUT: Ngehancurin data login
  const handleLogout = () => {
    const confirmLogout = window.confirm('Yakin mau cabut / logout dari sistem SSS?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      
      alert('Berhasil logout. Stay safe di jalan bos!');
      
      // 👇 INI YANG BERUBAH BOS: Sekarang abis logout langsung dilempar ke /login
      window.location.href = '/login'; 
    }
  };

  return (
    <nav style={{ 
      backgroundColor: '#000', 
      borderBottom: '3px solid #333', 
      padding: '20px 40px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      boxShadow: '0px 4px 0px #ffeb3b', // Aksen garis kuning khas SSS
      marginBottom: '30px'
    }}>
      
      {/* Bagian Kiri: Logo & Menu Utama */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <h2 style={{ color: '#fff', margin: 0, fontSize: '2rem', letterSpacing: '3px', fontFamily: "'Bebas Neue', cursive" }}>
          SSS RENTAL
        </h2>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>HOME</Link>
        
        {/* Tombol Rahasia: Cuma nongol kalau yang login ADMIN */}
        {role === 'admin' && (
          <Link to="/tambah" style={{ 
            color: '#000', 
            backgroundColor: '#ffeb3b', 
            padding: '8px 15px', 
            textDecoration: 'none', 
            fontWeight: '900', 
            border: '2px solid #000' 
          }}>
            + TAMBAH ARMADA
          </Link>
        )}
      </div>

      {/* Bagian Kanan: Area User / Auth */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {user ? (
          // TAMPILAN KALAU UDAH LOGIN
          <>
            <span style={{ color: '#ffeb3b', fontWeight: 'bold', letterSpacing: '1px' }}>
              REBEL ID: {user.nama.toUpperCase()}
            </span>
            <button onClick={handleLogout} style={{ 
              backgroundColor: '#ff5252', 
              color: '#fff', 
              border: '2px solid #000', 
              padding: '10px 20px', 
              fontWeight: '900', 
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '4px 4px 0px #111'
            }}>
              LOGOUT
            </button>
          </>
        ) : (
          // TAMPILAN KALAU BELUM LOGIN
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>LOGIN</Link>
            
            {/* 👇 INI YANG UDAH DIGANTI BIAR JELAS */}
            <Link to="/register" style={{ 
              color: '#fff', // Tulisan diubah jadi putih
              backgroundColor: 'transparent', // Background putih dihapus
              textDecoration: 'none', 
              fontWeight: 'bold', 
              border: '2px solid #ffeb3b', // Dikasih border kuning biar masuk tema
              padding: '8px 20px',
              textTransform: 'uppercase'
            }}>
              JOIN CREW
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;