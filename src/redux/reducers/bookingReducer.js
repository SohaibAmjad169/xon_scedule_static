const initialState = {
    bookingInfo: null,
    loading: false,
    error: null,
  };
  
  const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case "BOOKING_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "BOOKING_SUCCESS":
        return { ...state, loading: false, bookingInfo: action.payload };
  
      case "BOOKING_FAILURE":
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default bookingReducer;
  