import React from "react";
import { Box, CircularProgress } from "@mui/material";
import "../App.css";

const Loader = () => (
  <Box className="loader-container">
    <CircularProgress color="primary" />
  </Box>
);

export default Loader;
