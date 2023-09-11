import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import InputAdornment from "@mui/material/InputAdornment";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

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

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
export default function BasicTextFields() {
  const [formData, setFormData] = React.useState({
    userId: 0,
    id: 0,
    title: "",
    body: "",
  });

  const [validation, setValidation] = React.useState({
    userId: false,
    id: false,
    title: "",
    body: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [transition, setTransition] = React.useState(undefined);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setSnackbarOpen(true);
  };

  /*update state*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  const checkValidation = () => {
    const errors = { ...validation };

    errors.userId =
      !formData.userId || !formData.userId.trim() ? "user Id is required" : "";

    errors.id = !formData.id ? "id is required" : "";

    errors.title = !formData.title.trim() ? "title is required" : "";

    setValidation(errors);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Button clicked");

    checkValidation();
    setIsLoading(true);
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        userId: formData.userId,
        title: formData.title,
        body: formData.body,
      })
      .then((response) => {
        console.log("Post created:", response.data);
        showSnackbar(
          `Post with ${JSON.stringify(
            response.data.userId
          )}'s userId created...`
        );
      })

      .catch((err) => {
        console.error("Error creating post:", err);
        showSnackbar(`Error creating post: ${JSON.stringify(err)}`);
      })
      .finally(() => {
        setIsLoading(false);
        console.log(isLoading);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "35rem", m: 4 },
          justifyContent: "center",
        }}
        noValidate
        onSubmit={submitHandler}
        autoComplete="off"
      >
        <div>
          <TextField
            fullWidth
            helperText={
              validation.title ? "Title is required" : "Please enter your title"
            }
            id="outlined-basic"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <TextField
            helperText={validation.body ? "" : "Please enter your description"}
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
            helperText={
              validation.userId
                ? "userId is required"
                : "Please enter your user Id"
            }
            id="demo-helper-txt-misaligned"
            label="userId"
            fullWidth
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>

        <Stack spacing={2} direction="row">
          {isLoading ? (
            <CircularProgress size={24}></CircularProgress>
          ) : (
            <CustomButton
              type="submit"
              variant="outlined"
              onClick={handleClick(TransitionLeft)}
            >
              Create Employee
            </CustomButton>
          )}
        </Stack>
        <Snackbar
          TransitionComponent={transition}
          key={transition ? transition.name : ""}
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        ></Snackbar>
      </Box>
    </ThemeProvider>
  );
}
