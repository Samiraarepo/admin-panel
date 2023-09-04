import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { createTheme, ThemeProvider } from "@mui/material";
// import Typography from "@mui/material";

const theme = createTheme({
  typography: {
    fontSize: 22,
  },
});

export default function BasicTextFields() {
  return (
    <ThemeProvider theme={theme}>
      <FormControl margin="normal" sx={{ width: "35rem" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 2 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            helperText="Please enter your name"
            id="demo-helper-text-misaligned"
            label="Name"
          />
          <TextField
            helperText="Please enter your Salary"
            id="demo-helper-text-misaligned"
            label="Salary"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            helperText="Please enter your Age"
            id="demo-helper-text-misaligned"
            label="Age"
            fullWidth
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </FormControl>
    </ThemeProvider>
  );
}
