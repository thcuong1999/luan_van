import React from "react";
import Button from "@mui/material/Button";

const ButtonMaterial = ({ variant, startIcon, endIcon, onClick, children }) => {
  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ButtonMaterial;
