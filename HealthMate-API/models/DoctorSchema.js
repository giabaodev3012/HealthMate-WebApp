import mongoose from "mongoose";

// Định nghĩa schema cho collection Doctor
const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  role: { type: String },
  specialization: { type: String },
  qualifications: { type: Array },
  experiences: { type: Array },
  bio: { type: String, maxLength: 50 },
  about: { type: String },

  // Khung giờ làm việc chi tiết
  timeSlots: [
    {
      day: { type: String, required: true }, // Ví dụ: "Monday", "Tuesday"
      startingTime: { type: String, required: true }, // Ví dụ: "09:00"
      endingTime: { type: String, required: true }, // Ví dụ: "11:00"
    },
  ],

  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

// Tạo mô hình (model) từ schema và export
export default mongoose.model("Doctor", DoctorSchema);
