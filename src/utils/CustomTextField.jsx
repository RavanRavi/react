import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ errorText, ...props }) => (
  <TextField
    {...props}
    error={!!errorText}
    helperText={errorText}
    InputLabelProps={{
      style: { color: "#000" },
    }}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: 8,
        "& fieldset": {
          borderColor: "#888",
        },
        "&:hover fieldset": {
          borderColor: "#888",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#888",
        },
      },
      "& .MuiInputLabel-root": {
        color: "#000",
      },
    }}
  />
);

export default React.memo(CustomTextField);
