import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InputField from "../components/InputField";
import CustomButton from "./CustomButton";
import "../App.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const GetProfile = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.user);
      setFormData({ name: res.data.user.name, email: res.data.user.email });
    } catch (err) {
      console.error("Error fetching profile:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${BACKEND_URL}/api/auth/profile`,
        {
          name: formData.name,
          email: formData.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data.user);
      setOpen(false);
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
    }
  };

  if (!user) return null;

  return (
    <Box className="profile-container">
      <Box className="profile-info">
        <Avatar className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box className="profile-text">
          <Typography variant="subtitle1" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Box>
      </Box>
      <IconButton
        onClick={() => setOpen(true)}
        color="inherit"
        className="edit-icon"
      >
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent className="dialog-content">
          <InputField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <InputField
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton label="Cancel" color="secondary" onClick={() => setOpen(false)} />
          <CustomButton label="Update" color="primary" type="submit" onClick={handleUpdate} />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GetProfile;
