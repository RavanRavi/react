import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ text, onClick, disabled }) => (
  <Button 
    variant="contained" 
    color="primary" 
    onClick={onClick}
    disabled={disabled}
    sx={{ 
      borderRadius: 8, 
      minWidth: 100, 
      textTransform: 'none', 
      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)', 
      fontWeight: 'bold',
      ...(disabled && { opacity: 0.5 })
    }}
  >
    {text}
  </Button>
);

export default CustomButton;
