import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import AlertBox from "../components/AlertBox";
import Loader from "../components/Loader";
import "../App.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreateTask = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
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
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      return setAlert({
        open: true,
        type: "error",
        message: "Unauthorized. Please login first.",
      });
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/task/createTask`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlert({
        open: true,
        type: "success",
        message: res.data.message || "Task created successfully!",
      });

      setFormData({
        title: "",
        description: "",
        dueDate: "",
        status: "pending",
      });

      setShowForm(false);

      setTimeout(() => {
        setAlert((prev) => ({ ...prev, open: false }));
        setLoading(true);
      }, 1500);

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 3000);
    } catch (error) {
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
      <Box className="task-back-button">
        <IconButton onClick={() => navigate("/")} size="large">
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {alert.open && (
        <Box className="task-alert">
          <AlertBox
            open={alert.open}
            type={alert.type}
            message={alert.message}
            onClose={handleCloseAlert}
          />
        </Box>
      )}

      {loading ? (
        <Box className="task-loader">
          <Loader />
        </Box>
      ) : (
        showForm && (
          <Paper elevation={3} className="task-form-container">
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Create New Task
              </Typography>

              <InputField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <InputField
                label="Description"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
              <InputField
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <InputField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                select
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "completed", label: "Completed" },
                ]}
              />

              <CustomButton label="Create Task" type="submit" />
            </Box>
          </Paper>
        )
      )}
    </Container>
  );
};

export default CreateTask;
