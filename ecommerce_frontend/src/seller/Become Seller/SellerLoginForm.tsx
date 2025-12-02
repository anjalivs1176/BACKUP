import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { loginSeller, sendLoginSignupOtp, clearSellerError } from "../../state/AuthSlice";
import { useNavigate } from "react-router-dom";
import { fetchSellerProfile } from "../../state/seller/sellerProfileSlice";

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { message, error } = useAppSelector((state) => state.auth);

  const [otpSent, setOtpSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      dispatch(loginSeller(values));
    },
  });

  const handleSendOtp = () => {
    if (!formik.values.email.trim()) {
      alert("Please enter an email first");
      return;
    }
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
    setOtpSent(true);
  };

  // 👉 Clear error when editing fields
  const handleInputChange = (e: React.ChangeEvent<any>) => {
    formik.handleChange(e);
    dispatch(clearSellerError());
  };

  // 👉 Redirect on success
  useEffect(() => {
    if (message === "Login successful") {
         const token = localStorage.getItem("jt");
    if (token) {
      dispatch(fetchSellerProfile(token));
    }
      navigate("/seller");
    }
  }, [message, navigate,dispatch]);

  return (
    <div>
      <h1 className="text-center text-xl font-bold text-primary-color pb-5">
        Login as Seller
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Email */}
        <TextField
          fullWidth
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* OTP */}
        {otpSent && (
          <div className="space-y-2">
            <p className="font-medium text-sm opacity-60">
              Enter OTP sent to your email
            </p>
            <TextField
              fullWidth
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
          </div>
        )}

        {/* ⚠️ Show invalid OTP error */}
        {error && (
          <p className="text-red-500 text-sm text-center font-medium">Invalid OTP</p>
        )}

        {/* Send OTP */}
        {!otpSent && (
          <Button
            onClick={handleSendOtp}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            Send OTP
          </Button>
        )}

        {/* Login */}
        {otpSent && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            Login
          </Button>
        )}
      </form>
    </div>
  );
};

export default SellerLoginForm;


