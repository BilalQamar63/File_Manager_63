import React, { useState } from 'react';
import {
  Container,
  Typography,
  Alert,
  Button,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 
import InputField from '../components/InputField'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/forgotPassword`, {
        email,
      });

      setAlert({ type: 'success', message: res.data.message });

      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err) {
      setAlert({
        type: 'error',
        message:
          err.response?.data?.message ||
          'Something went wrong. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="forgot-container">
      <Paper elevation={3} className="forgot-paper">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Forgot Password
        </Typography>

        {alert.message && (
          <Alert severity={alert.type} className="forgot-alert">
            {alert.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <InputField
            fullWidth
            type="email"
            label="Enter your email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="forgot-input"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className="forgot-button"
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
