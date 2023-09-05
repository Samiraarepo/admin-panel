import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import InputAdornment from "@mui/material/InputAdornment";
import { createTheme, ThemeProvider } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";

const theme = createTheme({
  typography: {
    fontSize: 22,
  },
});

const CustomButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export default function BasicTextFields() {
  const [formData, setFormData] = React.useState({
    id: 0,
    userId: 0,
    title: "",
    body: "",
  });

  /*update state*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Button clicked");

    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        id: formData.id,
        userId: formData.userId,
        title: formData.title,
        body: formData.body,
      })
      .then((response) => console.log("Post created:", response.data))
      .catch((err) => console.error("Error creating post:", err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "35rem", m: 4 },
        }}
        noValidate
        onSubmit={submitHandler}
        autoComplete="off"
      >
        <div>
          <TextField
            fullWidth
            helperText="Please enter your Title"
            id="outlined-basic"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            helperText="Please enter your description"
            id="outlined-start-adornment"
            label="description"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">🤞</InputAdornment>
              ),
            }}
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            helperText="Please enter your Id"
            id="demo-helper-text-misaligned"
            label="Id"
            fullWidth
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
        </div>

        <Stack spacing={2} direction="row">
          <CustomButton type="submit" variant="outlined">
            Create Employee
          </CustomButton>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
