import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// JALUR 1: REGISTER (Buat User Biasa)
router.post('/register', async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    
    // Cek dulu emailnya udah kepake belum
    const cekUser = await User.findOne({ email });
    if (cekUser) return res.status(400).json({ message: "Email udah didaftarin orang bos!" });

    // Bikin user baru (role otomatis jadi 'user' karena default di model)
    const newUser = new User({ nama, email, password });
    await newUser.save();
    
    res.status(201).json({ message: "Sukses join the crew!" });
  } catch (error) {
    res.status(500).json({ message: "Gagal daftar", error: error.message });
  }
});

// JALUR 2: LOGIN (Pemilah Admin & User)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // --- 🚨 BACKDOOR ADMIN SSS 🚨 ---
    // Kalau email & pass ini yang dimasukin, langsung bypass jadi Admin!
    if (email === 'admin@sss.com' && password === 'admin123') {
      return res.status(200).json({
        message: "Akses Dewa Diberikan!",
        user: { nama: 'Bos SSS', email: 'admin@sss.com', role: 'admin' },
        token: "token-admin-rahasia" // Dummy token buat UTS
      });
    }

    // --- PENGECEKAN USER BIASA ---
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Kredensial salah bos!" });

    // Kalau cocok, kasih izin masuk sebagai 'user'
    res.status(200).json({
      message: "Sukses login!",
      user: { nama: user.nama, email: user.email, role: user.role },
      token: "token-user-standar"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;