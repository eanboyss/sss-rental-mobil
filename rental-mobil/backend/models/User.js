import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' } // INI KUNCINYA BOS! Defaultnya selalu 'user'
});

export default mongoose.model('User', userSchema);