import React, { useState } from 'react';
import {
  Container,
  TextField,
  Typography,
  Alert,
  Button,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const resetToken = query.get('token');
  const userId = query.get('id');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/resetPassword`, {
        userId,
        resetToken,
        newPassword,
      });

      setAlert({ type: 'success', message: res.data.message });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Something went wrong. Try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="reset-container">
      <Paper elevation={3} className="reset-paper">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Reset Your Password
        </Typography>

        {alert.message && (
          <Alert severity={alert.type} className="reset-alert">
            {alert.message}
          </Alert>
        )}

        {resetToken && userId ? (
          <Box component="form" onSubmit={handleSubmit}>
            <InputField
              fullWidth
              type="password"
              label="New Password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="reset-input"
            />

            <CustomButton
            label='ResetPassword'
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            />
          </Box>
        ) : (
          <Alert severity="error" className="reset-invalid">
            Invalid reset link. Token or ID missing.
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default ResetPassword;
