import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { CircularProgress, useTheme, ThemeProvider } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

const CustomButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 14,
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
function EditDoctor({ onUpdateDoctor, doctors }) {
  const theme = useTheme();
  const { id } = useParams();
  const [formData, setFormData] = React.useState({
    id: "",
    name: "",
    specialty: "",
    location: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    id: "",
    name: "",
    specialty: "",
    location: "",
    phone: "",
    email: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [transition, setTransition] = React.useState(undefined);

  useEffect(() => {
    axios
      .get("http://localhost:3000/doctors")
      .then((response) => {
        const doctor = response.data;

        if (doctor) {
          setFormData({
            id: doctor.id,
            name: doctor.name,
            specialty: doctor.specialty,
            location: doctor.location,
          });
        } else {
          showSnackbar(`Employee not defined!!`);
        }
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [id]); //http://localhost:3005/user/${id}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const validationResult = validateField(name, value);
    setFormErrors({
      ...formErrors,
      [name]: validationResult,
    });
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  /* Validation */
  const checkValidation = (errors) => {
    errors = { ...formErrors };

    errors.id = !formData.id ? "user Id is required" : "";
    errors.name = !formData.name.trim() ? "name is required" : "";
    errors.specialty = !formData.specialty ? "Please enter your specialty" : "";
    setFormErrors(errors);
  };
  const validateField = (name, value) => {
    switch (name) {
      case "id":
        checkValidation(value);
        break;
      case "name":
        checkValidation(value);
        break;
      case "specialty":
        checkValidation(value);
        break;
      default:
        return true;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    checkValidation();
    setIsLoading(true);
    // Update the employee in your JSON file or database
    onUpdateDoctor(formData);
    // Redirect the user or show a success message
  };
  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
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
          <TextField
            helperText={formErrors.name ? "" : "Please enter your Name"}
            error={Boolean(formErrors.name)}
            id="outlined-basic"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div>
          <TextField
            helperText={"Please enter your location"}
            id="outlined-start-adornment"
            label="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <div>
          <TextField
            helperText={"Please enter your ID"}
            error={Boolean(formErrors.id)}
            id="demo-helper-txt-misaligned"
            label="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div>
          <TextField
            helperText={"Please enter your specialty"}
            error={Boolean(formErrors.specialty)}
            id="demo-helper-txt-misaligned"
            label="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>

        <Stack spacing={2} direction="row">
          {isLoading ? (
            <CircularProgress size={34}></CircularProgress>
          ) : (
            <CustomButton
              type="submit"
              variant="outlined"
              onClick={handleClick(TransitionLeft)}
            >
              Edit Doctor
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

export default EditDoctor;
