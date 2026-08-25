import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import appointmentSlots from "../../database/appointmentSlots.json";

const Calendar = () => {
  const navigate = useNavigate();

  // Default date
  const defaultDate = new Date("2024-01-01");
  const defaultDateString = "01-01-2024";

  const [selectedDate, setSelectedDate] = useState(defaultDateString);
  const [slotDate, setSlotDate] = useState("01");
  const [currentDate, setCurrentDate] = useState(defaultDate);

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Determine the first day of the current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth; // Adjust for Sunday (0)

  // Generate days for the current month, including placeholders for the start
  const days = [
    ...Array(adjustedFirstDay - 1).fill(null), // Add placeholders for previous days
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1), // Actual days
  ];

  const handleDateClick = (day) => {
    if (day >= currentDay) {
      const formattedDateString = `${String(day).padStart(2, "0")}-${String(
        currentMonth + 1
      ).padStart(2, "0")}-${currentYear}`;

      setSelectedDate(formattedDateString);
      setSlotDate(day.toString().padStart(2, "0"));

      // Update window and localStorage
      updateBookingInfo(formattedDateString, day.toString().padStart(2, "0"));
    }
  };

  const updateBookingInfo = (date, day) => {
    const newBooking = {
      userDetails: {
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
      },
      paymentDetails: {
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      },
      bookingDetails: {
        selectedDate: date || "",
        selectedTime: "",
        serviceFee: "",
      },
    };

    window.currentBookingInfo = newBooking;
    localStorage.setItem("currentBookingInfo", JSON.stringify(newBooking));
  };

  useEffect(() => {
    updateBookingInfo(defaultDateString, "01");
  }, []);

  const handleBooking = (time) => {
    if (selectedDate && time) {
      navigate("/checkout", { state: { selectedDate, selectedTime: time } });
    }
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
  
    // Update the current date
    setCurrentDate(newDate);
  
    // Validate the selected date
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth();
    const daysInNewMonth = new Date(newYear, newMonth + 1, 0).getDate();
  
    let newSelectedDate = selectedDate.split("-");
    let selectedDay = parseInt(newSelectedDate[0], 10);
  
    if (selectedDay > daysInNewMonth) {
      selectedDay = daysInNewMonth; // Adjust to the last day of the new month if needed
    }
  
    const formattedDateString = `${String(selectedDay).padStart(2, "0")}-${String(
      newMonth + 1
    ).padStart(2, "0")}-${newYear}`;
  
    setSelectedDate(formattedDateString);
    setSlotDate(String(selectedDay).padStart(2, "0"));
  
    // Update the booking info
    updateBookingInfo(formattedDateString, String(selectedDay).padStart(2, "0"));
  };
  
  const changeYear = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentYear + direction);
  
    // Update the current date
    setCurrentDate(newDate);
  
    // Validate the selected date
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth();
    const daysInNewMonth = new Date(newYear, newMonth + 1, 0).getDate();
  
    let newSelectedDate = selectedDate.split("-");
    let selectedDay = parseInt(newSelectedDate[0], 10);
  
    if (selectedDay > daysInNewMonth) {
      selectedDay = daysInNewMonth; // Adjust to the last day of the new month if needed
    }
  
    const formattedDateString = `${String(selectedDay).padStart(2, "0")}-${String(
      newMonth + 1
    ).padStart(2, "0")}-${newYear}`;
  
    setSelectedDate(formattedDateString);
    setSlotDate(String(selectedDay).padStart(2, "0"));
  
    // Update the booking info
    updateBookingInfo(formattedDateString, String(selectedDay).padStart(2, "0"));
  };
  

  return (
    <div
      className="calendar-container bg-white rounded-md shadow-lg p-4"
      style={{
        width: "100%",
        maxWidth: "400px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Header */}
      <div className="calendar-header bg-blue-600 text-white text-center py-4 rounded-t-md mb-4 shadow-md">
        <div className="flex justify-between items-center">
          <button
            onClick={() => changeMonth(-1)}
            className="text-white hover:text-gray-200"
          >
            <FaChevronLeft size={20} />
          </button>
          <h2 className="font-semibold text-xl">
            {`${currentDate.toLocaleString("default", {
              month: "long",
            })} ${currentYear}`}
          </h2>
          <button
            onClick={() => changeMonth(1)}
            className="text-white hover:text-gray-200"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => changeYear(-1)}
            className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded-md text-sm"
          >
            Previous Year
          </button>
          <button
            onClick={() => changeYear(1)}
            className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded-md text-sm"
          >
            Next Year
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid grid grid-cols-7 gap-2 pb-4 px-5">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div
            key={day}
            className="weekday text-xs font-bold text-gray-700 text-center"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`day text-center cursor-pointer rounded-full transition-transform duration-200 hover:scale-105 ${
              day === null
                ? "invisible"
                : day < currentDay
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : slotDate === day.toString().padStart(2, "0")
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-100 text-gray-800"
            }`}
            onClick={() => day !== null && handleDateClick(day)}
            style={{
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            {day || ""}
          </div>
        ))}
      </div>

      {/* Appointment Info */}
      {selectedDate && (
        <div className="appointment-info text-center mt-6">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Available Appointments on {selectedDate}
          </p>
          <div className="flex flex-col items-center gap-3">
            {appointmentSlots.appointments[slotDate]?.map((time, index) => (
              <div
                key={index}
                className="flex justify-between items-center w-full max-w-md p-4 rounded-lg shadow-md bg-gray-100 hover:shadow-lg transition-shadow"
              >
                <p className="text-blue-600 font-bold">{time}</p>
                <button
                  onClick={() => handleBooking(time)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Book
                </button>
              </div>
            ))}
            {!appointmentSlots.appointments[slotDate] && (
              <p className="text-gray-500 italic">
                No slots available for this date.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
