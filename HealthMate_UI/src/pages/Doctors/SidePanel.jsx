/* eslint-disable react/prop-types */
import { useState } from "react";
import convertTime from "../../utils/converTime";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  // Hàm chọn hoặc bỏ chọn khung giờ
  const toggleTimeSlot = (slot) => {
    setSelectedTimeSlots((prevSelected) => {
      if (prevSelected.includes(slot)) {
        return prevSelected.filter((item) => item !== slot);
      } else {
        return [...prevSelected, slot];
      }
    });
  };

  // Xử lý khi người dùng đặt lịch
  const bookingHandler = async () => {
    if (selectedTimeSlots.length === 0) {
      return toast.error("Please select at least one time slot.");
    }

    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ timeSlots: selectedTimeSlots }), // Gửi timeSlots đã chọn
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + " Please try again");
      }

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-[#0097B2] font-bold">
          {ticketPrice} USD
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTimeSlots.includes(item)}
                  onChange={() => toggleTimeSlot(item)} // Xử lý chọn khung giờ
                  className="mr-2"
                />
                <p className="text-[14px] leading-6 text-textColor font-semibold">
                  {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                </p>
                <p className="text-[14px] leading-6 text-textColor font-semibold">
                  {convertTime(item.startingTime)} -{" "}
                  {convertTime(item.endingTime)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={bookingHandler}
        className="btn px-2 w-full rounded-md bg-[#0097B2] text-white"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
