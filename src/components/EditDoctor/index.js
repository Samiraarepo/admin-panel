import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
function EditDoctor(props) {
  const theme = useTheme();
  const { id } = useParams();

  const [doctors, setDoctors] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  const navigat = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/doctors/" + id)
      .then((response) => {
        const doctor = response.data;

        if (doctor) {
          props.setFormData({
            id: doctor.id,
            name: doctor.name,
            specialty: doctor.specialty,
            location: doctor.location,
          });
        } else {
          props.showSnackbar(`Employee not defined!!`);
        }
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []); //http://localhost:3005/user/${id}

  const onUpdateDoctor = (formData) => {
    // Find the index of the doctor to update in the doctors array
    const doctorIndex = doctors.findIndex((emp) => emp.id === formData.id);

    if (doctorIndex !== -1) {
      // Create a copy of the doctors array
      const updateDoctors = [...doctors];

      // Update the doctor with the new data
      updateDoctors[doctorIndex] = formData;

      // Update the state with the new array
      setDoctors(updateDoctors);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.checkValidation();
    setIsLoading(true);
    // Update the employee in your JSON file or database
    axios
      .put("http://localhost:3000/doctors/" + id, props.formData)
      .then(() => {
        //
        onUpdateDoctor(props.formData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // Redirect the user or show a success message
    props.showSnackbar("data successfully updated...");
    navigat("/table");
  };
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
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            helperText={props.formErrors.name ? "" : "Please enter your Name"}
            error={Boolean(props.formErrors.name)}
            id="outlined-basic"
            label="Name"
            name="name"
            value={props.formData.name}
            fullWidth
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            helperText={"Please enter your location"}
            id="outlined-start-adornment"
            label="location"
            name="location"
            value={props.formData.location}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <div>
          <TextField
            helperText={"Please enter your ID"}
            error={Boolean(props.formErrors.id)}
            id="demo-helper-txt-misaligned"
            label="id"
            name="id"
            value={props.formData.id}
            required
            fullWidth
            disabled
          />
        </div>
        <div>
          <TextField
            helperText={"Please enter your specialty"}
            error={Boolean(props.formErrors.specialty)}
            id="demo-helper-txt-misaligned"
            label="specialty"
            name="specialty"
            value={props.formData.specialty}
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
          open={props.snackbarOpen}
          autoHideDuration={5000}
          onClose={() => props.setSnackbarOpen(false)}
          message={props.snackbarMessage}
        ></Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default EditDoctor;
