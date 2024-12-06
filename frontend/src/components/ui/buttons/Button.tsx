interface ButtonProps {
  text: string;
}

import { Button } from "@mui/material";

const ButtonFunc = ({ text }: ButtonProps) => {
  const mainColor = "#199B8A";

  return (
    <Button
      variant="outlined"
      sx={{
        backgroundColor: mainColor,
        color: "white",
        "&:hover": {
          backgroundColor: mainColor,
          opacity: 0.9,
        },
        fontFamily: "Outfit, sans-serif",
      }}
    >
      {text}
    </Button>
  );
};

export default ButtonFunc;
