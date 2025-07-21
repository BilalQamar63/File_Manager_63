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

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    type: "error",
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
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, formData);
      const token = response.data.token;
      const userId = response.data.user?.id;

      if (token && userId) {
        // Save token
        localStorage.setItem("token", token);
        localStorage.setItem("tokenTime", Date.now().toString());
        localStorage.setItem('userId', userId)

        // Show success alert
        setAlert({
          open: true,
          type: "success",
          message: response.data.message || "Login successful!",
        });

        // Clear form and hide form
        setFormData({ email: "", password: "" });
        setShowForm(false); 

        setTimeout(() => {
          setAlert((prev) => ({ ...prev, open: false }));
          setLoading(true);
        }, 1500);

        // Redirect after loader
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setAlert({
        open: true,
        type: "error",
        message: error.response?.data?.message || "Invalid credentials",
      });

      // Automatically close after 3s
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, open: false }));
      }, 3000);
    }
  };

  return (
    <Container maxWidth="sm">
      {/* Alert shows even if form is hidden */}
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

      {/* Loader shows after success */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="150px">
          <Loader />
        </Box>
      ) : showForm && (
        <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Login
            </Typography>

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
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Link href="/forgotPassword" variant="body2" underline="hover">
                Forgot password?
              </Link>
            </Box>
            <CustomButton label="Login" type="submit" />
          </Box>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/signup" underline="hover">
                Signup here
              </Link>
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default Login;
