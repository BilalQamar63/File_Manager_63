import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Paper,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import AlertBox from "../components/AlertBox";
import Loader from "../components/Loader";

// Access environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, formData);

      // Show success alert
      setAlert({
        open: true,
        type: "success",
        message: response.data.message || "Signup successful!",
      });

      // Clear form and hide it
      setFormData({ name: "", email: "", password: "" });
      setShowForm(false);

      // After 1.5s hide alert and show loader
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, open: false }));
        setLoading(true);
      }, 1500);

      // After loader, redirect to login
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Signup Error:", error);

      setAlert({
        open: true,
        type: "error",
        message: error.response?.data?.message || "Something went wrong",
      });

      setTimeout(() => {
        setAlert((prev) => ({ ...prev, open: false }));
      }, 3000);
    }
  };

  return (
    <Container maxWidth="sm">
      {/* Alert visible whether form is shown or not */}
      {alert.open && (
        <Box mt={4}>
          <AlertBox
            open={alert.open}
            type={alert.type}
            message={alert.message}
            onClose={handleCloseAlert}
          />
        </Box>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="150px">
          <Loader />
        </Box>
      ) : showForm && (
        <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Signup
            </Typography>

            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <CustomButton label="Signup" type="submit" />
          </Box>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default SignUp;
