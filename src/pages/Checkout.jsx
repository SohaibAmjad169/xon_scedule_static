import React, { createContext, useContext, useEffect, useState, forwardRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import validationSchemas from "../utils/validationSchema";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const FormContext = createContext();
const steps = ["Personal Info", "Payment Info", "Confirmation"];

const getRandomPrice = (prices) => {
  return prices[Math.floor(Math.random() * prices.length)];
};

// Create a proper forwarded ref component for the DatePicker input
const CustomInput = forwardRef(({ value, onClick, onChange, ...props }, ref) => (
  <input
    ref={ref}
    value={value}
    onChange={onChange}
    onClick={onClick}
    {...props}
  />
));

const FormStep = ({ fields, validationSchema, onSubmit, onBack, price, isPaymentStep }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [errors, setErrors] = useState({});
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Initialize expiryDate if not set
  useEffect(() => {
    if (!formData.expiryDate) {
      setFormData((prevData) => ({ ...prevData, expiryDate: "01/24" }));
    }
  }, [formData, setFormData]);

  // Sync NameOnCard with name from Personal Info step
  useEffect(() => {
    if (isPaymentStep && !formData.NameOnCard && formData.name) {
      setFormData((prevData) => ({ ...prevData, NameOnCard: formData.name }));
    }
  }, [isPaymentStep, formData.name, formData.NameOnCard, setFormData]);

  // Parse MM/YY string to Date object
  const parseToDate = (expiryDate) => {
    if (!expiryDate) return null;
    const [month, year] = expiryDate.split("/").map(Number);
    return new Date(`20${year}`, month - 1);
  };

  // Format Date object to MM/YY string
  const formatToMMYY = (date) => {
    if (!date) return "";
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
  };

  const handleDateChange = (date) => {
    const formattedDate = formatToMMYY(date);
    setFormData({ ...formData, expiryDate: formattedDate });
    setIsDatePickerOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      onSubmit();
      toast.success("Step validated successfully!");
    } catch (validationErrors) {
      const errorObj = {};
      validationErrors.inner.forEach((err) => {
        errorObj[err.path] = err.message;
      });
      setErrors(errorObj);
      toast.error("Please fix the errors and try again!");
    }
  };

  return (
    <Card sx={{ mt: 4, p: 3, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        {fields.map(({ name, label, type }) => {
          if (name === "expiryDate") {
            return (
              <div key={name} className="mb-4" style={{ marginTop: "16px" }}>
                <TextField
                  label={label}
                  name={name}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={formData.expiryDate || ""}
                  InputProps={{
                    inputProps: {
                      value: formData.expiryDate || "",
                    },
                    inputComponent: forwardRef((props, ref) => (
                      <DatePicker
                        selected={parseToDate(formData.expiryDate)}
                        onChange={handleDateChange}
                        dateFormat="MM/yy"
                        showMonthYearPicker
                        placeholderText="MM/YY"
                        customInput={<CustomInput ref={ref} {...props} />}
                        onClickOutside={() => setIsDatePickerOpen(false)}
                        open={isDatePickerOpen}
                        onFocus={() => setIsDatePickerOpen(true)}
                      />
                    )),
                  }}
                  onClick={() => setIsDatePickerOpen(true)}
                />
              </div>
            );
          }

          return (
            <TextField
              key={name}
              label={label}
              name={name}
              type={type || "text"}
              value={formData[name] || ""}
              onChange={handleChange}
              error={!!errors[name]}
              helperText={errors[name]}
              fullWidth
              margin="normal"
            />
          );
        })}

        {isPaymentStep && (
          <TextField
            label="Price"
            value={price}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
          />
        )}

        <Grid container spacing={2} mt={2}>
          {onBack && (
            <Grid item xs={6}>
              <Button variant="outlined" onClick={onBack} fullWidth>
                Back
              </Button>
            </Grid>
          )}
          <Grid item xs={onBack ? 6 : 12}>
            <Button variant="contained" onClick={handleNext} fullWidth>
              Next
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Confirmation = ({ selectedDate, selectedTime, prices }) => {
  const { formData, prevStep, setFormData } = useContext(FormContext);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.booking);
  const navigate = useNavigate();

  const handleConfirm = () => {
    const newBooking = {
      userDetails: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      },
      paymentDetails: {
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        NameOnCard: formData.NameOnCard,
      },
      bookingDetails: {
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        serviceFee: prices,
      },
    };

    const bookingResults = JSON.parse(localStorage.getItem("bookingResults")) || [];
    bookingResults.push(newBooking);
    localStorage.setItem("bookingResults", JSON.stringify(bookingResults));

    Swal.fire({
      title: "Appointment Confirmed!",
      text: "Your appointment has been successfully booked.",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
      customClass: {
        popup: "swal-custom-popup",
        title: "swal-custom-title",
        confirmButton: "swal-custom-button",
      },
    });

    setTimeout(() => {
      navigate("/");
    }, 3000);
    localStorage.setItem("currentBookingInfo", JSON.stringify({}));

    setFormData({});
  };

  return (
    <Card sx={{ mt: 4, p: 3, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Confirm Your Details
        </Typography>

        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginTop: 2,
            borderRadius: 2,
            backgroundColor: "#f5f5f5",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Booking Summary
          </Typography>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Date:
            </Typography>
            <Typography variant="body1">{selectedDate}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Time:
            </Typography>
            <Typography variant="body1">{selectedTime}</Typography>
          </div>

          <hr style={{ margin: "20px 0", border: "1px solid #ddd" }} />

          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {Object.entries(formData)
              .filter(([key]) =>
                ["name", "email", "address", "city", "zip"].includes(key)
              )
              .map(([key, value]) => (
                <React.Fragment key={key}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    style={{ textTransform: "capitalize" }}
                  >
                    {key}:
                  </Typography>
                  <Typography variant="body1">{value || "N/A"}</Typography>
                </React.Fragment>
              ))}
          </div>

          <hr style={{ margin: "20px 0", border: "1px solid #ddd" }} />

          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {["NameOnCard", "cardNumber", "expiryDate", "cvv"].map((key) => (
              <React.Fragment key={key}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  style={{ textTransform: "capitalize" }}
                >
                  {key.replace(/([A-Z])/g, " $1")}:
                </Typography>
                <Typography variant="body1">
                  {key === "cardNumber" && formData[key]
                    ? "**** **** **** " + formData[key].slice(-4)
                    : formData[key] || "N/A"}
                </Typography>
              </React.Fragment>
            ))}
          </div>
        </Paper>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={6}>
            <Button variant="outlined" onClick={prevStep} fullWidth>
              Back
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              fullWidth
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm"}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state || {};

  useEffect(() => {
    let bookingResults = JSON.parse(localStorage.getItem("bookingResults"));

    if (!bookingResults || bookingResults === undefined || bookingResults.length === 0) {
      window.bookingResults = [];
      localStorage.setItem("bookingResults", JSON.stringify(window.bookingResults));
    } else {
      window.bookingResults = bookingResults;
    }
  }, []);

  const [price, setPrice] = useState(() => {
    const savedBookingInfo = JSON.parse(localStorage.getItem("currentBookingInfo"));
    return savedBookingInfo?.bookingDetails?.serviceFee || getRandomPrice([200, 200, 200]);
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const formSteps = [
    {
      fields: [
        { name: "name", label: "Full Name" },
        { name: "email", label: "Email" },
        { name: "address", label: "Address" },
        { name: "city", label: "City" },
        { name: "zip", label: "ZIP Code" },
      ],
      validationSchema: validationSchemas.personalInfo,
    },
    {
      fields: [
        { name: "NameOnCard", label: "Name On Card" },
        { name: "cardNumber", label: "Card Number" },
        { name: "expiryDate", label: "Expiry Date" },
        { name: "cvv", label: "CVV" },
      ],
      validationSchema: validationSchemas.paymentInfo,
    },
  ];

  useEffect(() => {
    const newBooking = {
      userDetails: {
        name: formData.name || "",
        email: formData.email || "",
        address: formData.address || "",
        city: formData.city || "",
        zip: formData.zip || "",
      },
      paymentDetails: {
        cardNumber: formData.cardNumber || "",
        expiryDate: formData.expiryDate || "",
        cvv: formData.cvv || "",
        NameOnCard: formData.NameOnCard || ""
      },
      bookingDetails: {
        selectedDate: selectedDate || "",
        selectedTime: selectedTime || "",
        serviceFee: price,
      },
    };

    window.currentBookingInfo = {
      bookingDetails: {
        selectedDate: newBooking.bookingDetails.selectedDate,
        selectedTime: newBooking.bookingDetails.selectedTime,
        serviceFee: newBooking.bookingDetails.serviceFee,
      },
      userDetails: {
        name: newBooking.userDetails.name,
        email: newBooking.userDetails.email,
        address: newBooking.userDetails.address,
        city: newBooking.userDetails.city,
        zip: newBooking.userDetails.zip,
      },
      paymentDetails: newBooking.paymentDetails,
      isInFinalPage: step === steps.length - 1,
    };
    localStorage.setItem("currentBookingInfo", JSON.stringify(window.currentBookingInfo));
  }, [formData, step, selectedDate, selectedTime, price]);

  return (
    <FormContext.Provider value={{ step, formData, setFormData, nextStep, prevStep }}>
      <Container maxWidth="sm" style={{ marginTop: "100px" }}>
        <Toaster position="top-right" />
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {step < formSteps.length && (
          <FormStep
            fields={formSteps[step].fields}
            validationSchema={formSteps[step].validationSchema}
            onSubmit={nextStep}
            onBack={step > 0 ? prevStep : undefined}
            price={price}
            isPaymentStep={step === 1}
          />
        )}
        {step === formSteps.length && (
          <Confirmation
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            prices={price}
          />
        )}
      </Container>
    </FormContext.Provider>
  );
};

export default MultiStepForm;