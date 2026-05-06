import express from 'express';
import { 
  tambahMobil, 
  getMobil, 
  hapusSemuaMobil, 
  sewaMobil, 
  kembalikanMobil,
  hapusMobil // <-- Import fungsi hapus yang baru
} from '../controllers/mobilController.js';

const router = express.Router();

router.get('/', getMobil);
router.post('/', tambahMobil);
router.delete('/kosongkan', hapusSemuaMobil);

// Jalur Transaksi
router.put('/:id/sewa', sewaMobil);
router.put('/:id/kembali', kembalikanMobil);

// Jalur Hapus 1 Mobil
router.delete('/:id', hapusMobil); // <-- JALUR BARUNYA DI SINI BOS

export default router;