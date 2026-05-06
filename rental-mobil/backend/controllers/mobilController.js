import Mobil from '../models/Mobil.js';

// AMBIL SEMUA MOBIL
export const getMobil = async (req, res) => {
  try {
    const mobil = await Mobil.find();
    res.status(200).json(mobil);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TAMBAH MOBIL BARU (KHUSUS ADMIN)
export const tambahMobil = async (req, res) => {
  const mobil = new Mobil(req.body);
  try {
    const insertedMobil = await mobil.save();
    res.status(201).json(insertedMobil);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// HAPUS SEMUA MOBIL
export const hapusSemuaMobil = async (req, res) => {
  try {
    await Mobil.deleteMany({});
    res.status(200).json({ message: "Semua mobil berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FITUR SEWA MOBIL
export const sewaMobil = async (req, res) => {
  try {
    const { emailPenyewa } = req.body;
    const mobil = await Mobil.findById(req.params.id);
    
    if (!mobil) return res.status(404).json({ message: "Mobil ga ketemu bos!" });
    if (mobil.status === 'disewa') return res.status(400).json({ message: "Udah disewa orang!" });

    mobil.status = 'disewa'; 
    mobil.penyewa = emailPenyewa; // Catet emailnya
    await mobil.save();
    
    res.status(200).json({ message: "Sukses nyewa mobil!", mobil });
  } catch (error) {
    res.status(500).json({ message: "Gagal sistem", error: error.message });
  }
};

// FITUR KEMBALIKAN MOBIL
export const kembalikanMobil = async (req, res) => {
  try {
    const mobil = await Mobil.findById(req.params.id);
    
    if (!mobil) return res.status(404).json({ message: "Mobil ga ketemu bos!" });

    mobil.status = 'tersedia'; 
    mobil.penyewa = null; // Hapus data penyewanya
    await mobil.save();
    
    res.status(200).json({ message: "Mobil sukses dikembalikan ke garasi!", mobil });
  } catch (error) {
    res.status(500).json({ message: "Gagal sistem", error: error.message });
  }
};
// FITUR HAPUS 1 MOBIL (KHUSUS ADMIN)
export const hapusMobil = async (req, res) => {
  try {
    const mobil = await Mobil.findByIdAndDelete(req.params.id);
    if (!mobil) return res.status(404).json({ message: "Mobil ga ketemu bos!" });
    
    res.status(200).json({ message: "Mobil berhasil dilenyapkan dari garasi!" });
  } catch (error) {
    res.status(500).json({ message: "Gagal sistem", error: error.message });
  }
};