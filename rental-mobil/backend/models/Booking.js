import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mobil_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Mobil', required: true },
  tanggal_mulai: { type: Date, required: true },
  tanggal_selesai: { type: Date, required: true },
  pakai_supir: { type: Boolean, default: false },
  lokasi_pickup: { type: String, required: true },
  catatan: { type: String },
  status: { type: String, enum: ['menunggu', 'disetujui', 'selesai', 'dibatalkan'], default: 'menunggu' }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);