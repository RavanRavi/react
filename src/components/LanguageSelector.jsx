import React from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select } from "@mui/material";
import CustomTextField from "../utils/CustomTextField";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <CustomTextField
      select
      variant="outlined"
      margin="normal"
      value={i18n.language}
      onChange={handleLanguageChange}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="fr">French</MenuItem>
      <MenuItem value="hi">Hindi</MenuItem>
    </CustomTextField>
  );
};

export default LanguageSelector;
