import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useTheme, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

const CustomButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 14,
  color: "#fff",
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
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
export default function DoctorForm(props) {
  const theme = useTheme();

  /*update state*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    props.setFormData({
      ...props.formData,
      [name]: value,
    });
    const validationResult = props.validateField(name, value);
    props.setFormErrors({
      ...props.formErrors,
      [name]: validationResult,
    });
  };
  //****************************************** */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate each field
    props.validateField("name", props.formData.name);
    props.validateField("id", props.formData.id);

    //props.checkValidation(); /
    // Check if there are errors
    if (!props.formErrors.name && !props.formErrors.id) {
      props.setIsLoading(true);
      // Proceed only if there are no errors
      if (props.submitHandler) {
        props.submitHandler(props.formData);
      } else {
        console.log("Form submitted directly:", props.formData);
      }
    }
    props.setIsLoading(false);
  };

  const handleClick = (Transition) => () => {
    props.setTransition(() => Transition);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 4 },
          justifyContent: "center",
        }}
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div>
          <CssTextField
            fullWidth
            helperText={props.formErrors.name ? "Please enter your Name" : ""}
            error={Boolean(props.formErrors.name)}
            id="outlined-basic"
            label="Name"
            name="name"
            value={props.formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <CssTextField
            helperText={"Please enter your location"}
            id="outlined-start-adornment"
            label="location"
            fullWidth
            name="location"
            value={props.formData.location}
            onChange={handleChange}
          />
        </div>

        <div>
          <CssTextField
            helperText={props.formErrors.id ? "Please enter your ID" : ""}
            error={Boolean(props.formErrors.id)}
            id="demo-helper-txt-misaligned"
            label="id"
            fullWidth
            type="number"
            name="id"
            value={props.formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <CssTextField
            helperText={"Please enter your specialty"}
            error={Boolean(props.formErrors.specialty)}
            id="demo-helper-txt-misalign"
            label="specialty"
            fullWidth
            name="specialty"
            value={props.formData.specialty}
            onChange={handleChange}
            required
          />
        </div>

        <Stack spacing={2} direction="row">
          {props.isLoading ? (
            <CircularProgress size={34}></CircularProgress>
          ) : (
            <CustomButton
              type="submit"
              variant="outlined"
              onClick={handleClick(TransitionLeft)}
            >
              {props.buttonText || "Create"}
            </CustomButton>
          )}
        </Stack>
        <Snackbar
          TransitionComponent={props.transition}
          key={props.transition ? props.transition.name : ""}
          open={props.snackbarOpen}
          autoHideDuration={5000}
          onClose={() => props.setSnackbarOpen(false)}
          message={props.snackbarMessage}
        ></Snackbar>
      </Box>
    </ThemeProvider>
  );
}
