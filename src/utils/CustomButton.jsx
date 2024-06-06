import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ text, onClick, disabled }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    disabled={disabled}
    sx={{
      borderRadius: 8,
      minWidth: 100,
      textTransform: "none",
      fontWeight: "bold",
      backgroundColor: "#000",
      color: "#fff",
      boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
      "&:hover": {
        backgroundColor: "#333",
      },
      ...(disabled && { opacity: 0.5 }),
    }}
  >
    {text}
  </Button>
);

export default CustomButton;
