import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Dashboard from "../dashboard";
import DoctorTable from "../table";
// import DoctorForm from "./components/form";
import ErrorPage from "../../pages/ErrorPage";
import EditDoctor from "../../pages/EditDoctor";
import AddDoctor from "../../pages/AddDoctor";
import TopBar from "../global/Topbar";

const StyledMainContent = styled("div")(({ isCollapsed }) => ({
  width: "100%",
  float: "right",
  marginLeft: isCollapsed ? 0 : "5px", // Adjust the width of the sidebar
  overflowX: "hidden",
  transition: "margin-left 0.3s ease-in-out",
}));
function MainContent({ isCollapsed }) {
  const [formData, setFormData] = React.useState({
    id: 0,
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
  // Use useParams to access the id parameter from the URL
  // const { id } = useParams();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [transition, setTransition] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(false);

  /*VALIDATION*/
  const checkValidation = (formData) => {
    const errors = { ...formErrors };
    // Check if formData and formData.name are defined

    if (formData && formData.name) {
      errors.name = !formData.name.trim() ? "Name is required" : "";
    } else {
      errors.name = "Name is required";
    }

    errors.id = !formData || !formData.id ? "id is required" : "";

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
      case "location":
        checkValidation(value);
        break;
      default:
        return true;
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <StyledMainContent isCollapsed={isCollapsed}>
      <Box className="content">
        <TopBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/table"
            element={<DoctorTable showSnackbar={showSnackbar} />}
          />
          '
          <Route
            path="/create"
            element={
              <AddDoctor
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                snackbarMessage={snackbarMessage}
                setSnackbarOpen={setSnackbarOpen}
                snackbarOpen={snackbarOpen}
                showSnackbar={showSnackbar}
                validateField={validateField}
                checkValidation={() => checkValidation(formData)}
                transition={transition}
                setTransition={setTransition}
              />
            }
          />
          '
          {/* <Route
                      path="/form"
                      element={
                        <DoctorForm
                          formData={formData}
                          setFormData={setFormData}
                          formErrors={formErrors}
                          isLoading={isLoading}
                          setIsLoading={setIsLoading}
                          setFormErrors={setFormErrors}
                          showSnackbar={showSnackbar}
                          snackbarMessage={snackbarMessage}
                          snackbarOpen={snackbarOpen}
                          setSnackbarOpen={setSnackbarOpen}
                          validateField={validateField}
                          checkValidation={checkValidation}
                          transition={transition}
                          setTransition={setTransition}
                        />
                      }
                    /> */}
          <Route
            path="/update/:id"
            element={
              <EditDoctor
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                showSnackbar={showSnackbar}
                snackbarOpen={snackbarOpen}
                snackbarMessage={snackbarMessage}
                setSnackbarOpen={setSnackbarOpen}
                checkValidation={checkValidation}
                validateField={validateField}
                transition={transition}
                setTransition={setTransition}
              />
            }
          />
          {/* /:id the path shouldn't be like this /employee/:id */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Box>
    </StyledMainContent>
  );
}

export default MainContent;
