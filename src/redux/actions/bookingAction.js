export const bookAppointment = (bookingDetails) => async (dispatch) => {
  try {
    dispatch({ type: "BOOKING_REQUEST" });



  } catch (error) {
    dispatch({
      type: "BOOKING_FAILURE",
      payload: error.message || "Something went wrong",
    });
  }
};
