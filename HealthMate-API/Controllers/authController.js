import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    const existingUser =
      (await User.findOne({ email })) || (await Doctor.findOne({ email }));

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user =
      role === "patient"
        ? new User({
            name,
            email,
            password: hashedPassword,
            photo,
            gender,
            role,
          })
        : new Doctor({
            name,
            email,
            password: hashedPassword,
            photo,
            gender,
            role,
          });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User successfully created",
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user =
      (await User.findOne({ email })) || (await Doctor.findOne({ email }));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);
    const { password: pass, role, appointment, ...userData } = user._doc;

    res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      data: userData,
      role,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: false,
      message: "Server error during login",
    });
  }
};
