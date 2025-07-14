import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

import Stripe from "stripe";

export const getCheckoutSession = async (req, res) => {
  try {
    // Lấy thông tin bác sĩ và user
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    const { timeSlots } = req.body;

    // Kiểm tra tính hợp lệ của timeSlots
    if (!timeSlots || timeSlots.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Time slots are required" });
    }

    const isValidTimeSlots = timeSlots.every((slot) =>
      doctor.timeSlots.some(
        (s) =>
          s.day === slot.day &&
          s.startingTime === slot.startingTime &&
          s.endingTime === slot.endingTime
      )
    );

    if (!isValidTimeSlots) {
      return res.status(400).json({
        success: false,
        message: "Invalid time slots selected",
      });
    }

    // Tạo phiên thanh toán Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor._id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: doctor.ticketPrice * 100,
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    // Tạo booking với timeSlots
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
      timeSlots, // Thêm khung giờ đã chọn
    });

    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully paid", session });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};
