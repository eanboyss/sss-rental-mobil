import mongoose from 'mongoose';

const mobilSchema = new mongoose.Schema({
  nama_mobil: { type: String, required: true },
  merk: { type: String, required: true },
  harga: { type: Number, required: true },
  platNomor: { type: String, required: true },
  gambar: { type: String, required: true },
  status: { type: String, default: 'tersedia' },
  penyewa: { type: String, default: null } // Buat nyatet siapa yang nyewa
});

export default mongoose.model('Mobil', mobilSchema);