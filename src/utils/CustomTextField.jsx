import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ errorText, ...props }) => (
  <TextField
    {...props}
    error={!!errorText}
    helperText={errorText}
    sx={{
      borderRadius: 8,
      "& .MuiOutlinedInput-root": {
        borderRadius: 8,
        "&:hover": {
          borderColor: "rgba(0, 0, 0, 0.4)",
        },
        "&.Mui-focused": {
          borderColor: "#1976d2",
        },
      },
    }}
  />
);

export default React.memo(CustomTextField);
