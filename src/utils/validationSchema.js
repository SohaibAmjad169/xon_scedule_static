import * as yup from "yup"
const validationSchemas = {
    personalInfo: yup.object().shape({
      name: yup.string().required("Full Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      address: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      zip: yup
        .string()
        .matches(/^\d{5}$/, "Invalid ZIP code")
        .required("ZIP code is required"),
    }),
    paymentInfo: yup.object().shape({
      cardNumber: yup
        .string()
        .matches(/^\d{16}$/, "card number 16 digits")
        .required("Card number is required"),
      expiryDate: yup
        .string()
        .required("Expiry date not vaid"),
      cvv: yup
        .string()
        .matches(/^\d{3}$/, "Invalid CVV")
        .required("CVV is required"),
    }),
  };

  
  export default validationSchemas