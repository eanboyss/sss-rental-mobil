import mongoose from 'mongoose';

const PembayaranSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  metode: { type: String, enum: ['transfer_bank', 'e_wallet'], required: true },
  bukti_pembayaran: { type: String }, 
  status: { type: String, enum: ['pending', 'dikonfirmasi', 'ditolak'], default: 'pending' }
}, { timestamps: true });

export default mongoose.models.Pembayaran || mongoose.model('Pembayaran', PembayaranSchema);