import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// PANGGIL ROUTE YANG BARUSAN LU BIKIN
import authRoutes from './routes/authRoutes.js'; 
import mobilRoutes from './routes/mobilRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Tambahin baris ini
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// NYALAIN JALURNYA DI SINI
app.use('/api/auth', authRoutes);
app.use('/api/mobil', mobilRoutes);
app.get('/', (req, res) => {
  res.send("Backend rental mobil jalan nih bos!");
});
app.use('/api/users', userRoutes); // Tambahin baris ini

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database MongoDB Connected! 🚀");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server nyala di port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("Gagal nyambung ke database:", err);
  });