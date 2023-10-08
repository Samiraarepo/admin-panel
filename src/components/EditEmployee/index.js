import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
function EditEmployee({ onUpdateEmployee, employees }) {
  const { id } = useParams();
  const [formData, setFormData] = React.useState({
    id: 0,
    name: "",
    age: "0",
    department: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    id: false,
    name: "",
    age: "",
    department: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [transition, setTransition] = React.useState(undefined);

  useEffect(() => {
    axios.get(`./sample.json`).then((response) => {
      const employees = response.data;
      const employee = employees.find((emp) => emp.id === parseInt(id, 10));

      if (employee) {
        setFormData({
          id: employee.id,
          name: employee.name,
          age: employee.age,
          department: employee.department,
        });
      } else {
        showSnackbar(`Employee with ${id} not defined!!`);
      }
    });
  }, [id]);

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
  const checkValidation = () => {
    const errors = { ...formErrors };

    errors.id =
      !formData.id || !formData.id.trim() ? "user Id is required" : "";
    errors.name = !formData.name.trim() ? "name is required" : "";

    setFormErrors(errors);
  };
  const validateField = (name, value) => {
    switch (name) {
      case "userId":
        checkValidation(value);
        break;
      case "title":
        checkValidation(value);
        break;
      case "body":
        checkValidation(value);
        break;
      default:
        return true;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //Validation logic
    checkValidation();
    setIsLoading(true);
    // Update the employee in your JSON file or database
    onUpdateEmployee(formData);

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
          "& > :not(style)": { width: "35rem", m: 4 },
          justifyContent: "center",
        }}
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div>
          <TextField
            fullWidth
            helperText={formErrors.name ? "" : "Please enter your Name"}
            error={Boolean(formErrors.name)}
            id="outlined-basic"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <TextField
            helperText={
              formErrors.department ? "" : "Please enter your department"
            }
            id="outlined-start-adornment"
            label="department"
            fullWidth
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        <div>
          <TextField
            helperText={formErrors.id ? formErrors.id : "Please enter your ID"}
            error={Boolean(formErrors.id)}
            id="demo-helper-txt-misaligned"
            label="id"
            fullWidth
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
          <TextField
            helperText={
              formErrors.age ? formErrors.age : "Please enter your age"
            }
            error={Boolean(formErrors.age)}
            id="demo-helper-txt-misaligned"
            label="age"
            fullWidth
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
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
              Edit Employee
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

export default EditEmployee;
