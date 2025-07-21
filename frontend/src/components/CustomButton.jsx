import React from 'react';
import { Button } from '@mui/material';
import '../App.css';

const CustomButton = ({
  label,
  type = 'button',
  onClick,
  color = 'primary',
}) => {
  return (
    <Button
      className="custom-button"
      variant="contained"
      type={type}
      onClick={onClick}
      color={color}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
