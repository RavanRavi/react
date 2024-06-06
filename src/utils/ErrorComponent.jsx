import React from "react";
import { Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorComponent = ({ errorMessage }) => (
  <div style={{ textAlign: "center", marginTop: "20px" }}>
    <ErrorOutlineIcon style={{ fontSize: "48px", color: "red" }} />
    <Typography variant="h6" component="h2">
      Error:
    </Typography>
    <Typography variant="body1">{errorMessage}</Typography>
  </div>
);

export default ErrorComponent;
