import TextField from "@mui/material/TextField";

interface InputTextProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
}

const InputText = ({ value, setValue, label }: InputTextProps) => {
  const mainColor = "#199B8A";

  return (
    <TextField
      label={label}
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
      variant="outlined"
          fullWidth
          sx={{
        // Set the color of the text to white
        "& input": {
          color: mainColor,
        },
        // When the label is focused, change its color to mainColor
        "& label.Mui-focused": {
          color: mainColor,
        },
        // Set the default color of the label to mainColor
        "& label": {
          color: "gray",
        },
        // When the input is focused and underlined, change the bottom border color to mainColor
        "& .MuiInput-underline:after": {
          borderBottomColor: mainColor,
        },
        // Target the outlined variant of the input
        "& .MuiOutlinedInput-root": {
          // Set the default border color of the fieldset to mainColor
          "& fieldset": {
            borderColor: "gray",
          },
          // When the input is hovered, change the border color of the fieldset to mainColor
          "&:hover fieldset": {
            borderColor: mainColor,
          },
          // When the input is focused, change the border color of the fieldset to mainColor
          "&.Mui-focused fieldset": {
            borderColor: mainColor,
          },
        },
      }}
    />
  );
};

export default InputText;