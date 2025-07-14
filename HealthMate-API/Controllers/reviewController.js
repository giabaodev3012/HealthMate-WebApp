import Review from "../models/ReviewSchema.js"; // Import model Review.
import Doctor from "../models/DoctorSchema.js"; // Import model Doctor.

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ doctor: req.params.doctorId }); // Lọc đánh giá theo doctorId.
    res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();

    // Cập nhật bác sĩ với ID review vừa tạo.
    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id }, // Thêm ID đánh giá vào mảng reviews của bác sĩ.
    });

    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
