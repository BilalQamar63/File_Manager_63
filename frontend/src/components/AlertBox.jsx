import { Alert, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import '../App.css'; 

const AlertBox = ({ type = "success", message = "" }) => {
  const isSuccess = type === "success";

  return (
    <Alert
      severity={isSuccess ? "success" : "error"}
      icon={isSuccess ? <CheckCircleIcon fontSize="inherit" /> : <ErrorIcon fontSize="inherit" />}
      className={`alert-box ${isSuccess ? "success" : "error"}`}
    >
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          {isSuccess ? "Congratulations!" : "Oops!"}
        </Typography>
        <Typography variant="body2">
          {message || (isSuccess ? "Account created." : "Something went wrong.")}
        </Typography>
      </Box>
    </Alert>
  );
};

export default AlertBox;
