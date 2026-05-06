import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// FITUR REGISTER
export const register = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email udah kepake bro!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      nama,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();
    res.status(201).json({ message: "Register sukses! Gaskeun login." });
  } catch (error) {
    res.status(500).json({ message: "Error dari server", error: error.message });
  }
};

// FITUR LOGIN (BUAT USER & ADMIN)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email nggak ketemu nih." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Password salah!" });

    // Bikin Token JWT (Pake secret dari .env)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } 
    );

    res.status(200).json({
      message: "Login sukses!",
      token,
      user: { id: user._id, nama: user.nama, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Error dari server", error: error.message });
  }
};