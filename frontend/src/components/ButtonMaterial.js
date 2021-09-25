import React from "react";
import Button from "@mui/material/Button";

const ButtonMaterial = ({
  variant,
  startIcon,
  endIcon,
  onClick,
  children,
  className,
  color,
}) => {
  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      className={className}
      color={color}
    >
      {children}
    </Button>
  );
};

export default ButtonMaterial;
