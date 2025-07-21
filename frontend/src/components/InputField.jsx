import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import '../App.css';

const InputField = ({
  label,
  name,
  value,
  type = 'text',
  onChange,
  required = true,
  placeholder,
  multiline = false,
  rows,
  select = false,
  options = [],
  InputLabelProps,
}) => {
  return (
    <TextField
      className="custom-input"
      fullWidth
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      margin="normal"
      required={required}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      select={select}
      InputLabelProps={InputLabelProps}
    >
      {select &&
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default InputField;
