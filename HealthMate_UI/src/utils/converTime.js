const convertTime = (time) => {
  // timeParts sẽ trả về một mảng
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  let meridiem = "am";

  // Kiểm tra nếu giờ lớn hơn 12 để chuyển sang "pm"
  if (hours >= 12) {
    meridiem = "pm";
  }

  // Nếu giờ bằng 12, không cần trừ, nếu không thì trừ 12
  if (hours > 12) {
    hours -= 12;
  }

  // Xử lý trường hợp 12 am (nửa đêm)
  if (hours === 0) {
    hours = 12;
    meridiem = "am";
  }

  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    " " +
    meridiem
  );
};

export default convertTime;
