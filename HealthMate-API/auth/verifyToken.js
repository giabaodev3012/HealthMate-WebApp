import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Middleware xác thực người dùng
export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization denied",
    });
  }

  try {
    const token = authToken.split(" ")[1]; // Lấy token từ header.
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Giải mã token với secret key.

    req.userId = decoded.id; // Lưu id người dùng vào req.
    req.role = decoded.role; // Lưu vai trò người dùng vào req.

    next(); // Tiếp tục xử lý yêu cầu.
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" }); // Token hết hạn.
    }
    return res.status(401).json({
      success: false,
      message: "Invalid token", // Token không hợp lệ.
    });
  }
};

// Middleware phân quyền người dùng
export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  // Tìm người dùng từ cơ sở dữ liệu
  const user = (await User.findById(userId)) || (await Doctor.findById(userId));

  // Kiểm tra xem vai trò của người dùng có hợp lệ không
  if (!roles.includes(user.role)) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access", // Người dùng không có quyền truy cập.
    });
  }

  next(); // Tiếp tục xử lý yêu cầu nếu người dùng có quyền.
};
