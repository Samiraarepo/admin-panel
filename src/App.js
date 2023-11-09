import React, { useEffect, useState } from "react";
import { useMode, ColorModeContext } from "./theme";
// import { ThemeProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./layouts/dashboard";
import DoctorTable from "./components/DoctorTable";
import DoctorInfo from "./components/DoctorInfo";
import ErrorPage from "./components/ErrorPage";
import EditDoctor from "./components/EditDoctor";
import AddDoctor from "./components/AddDoctor";
import Sidebar from "./layouts/global/Sidebar";
import axios from "axios";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [theme, colorMode] = useMode();
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

  useEffect(() => {
    // Only make the GET request if id is defined (i.e., when visiting /user/:id route)
    axios
      .get("http://localhost:3000/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        alert("Error fetching doctor data:", error);
      });
  }, []);
  /*VALIDATION*/
  const checkValidation = () => {
    const errors = { ...formErrors };
    errors.name = !formData.name.trim() ? "Name is required" : "";
    errors.id = !formData.id ? "id is required" : "";

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
      case "speciality":
        checkValidation(value);
        break;
      case "location":
        checkValidation(value);
        break;
      default:
        return true;
    }
  };
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

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            <>
              <Sidebar />
              <main className="content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/table"
                    element={<DoctorTable showSnackbar={showSnackbar} />}
                  />
                  <Route
                    path="/form"
                    element={
                      <DoctorInfo
                        validateField={validateField}
                        checkValidation={checkValidation}
                      />
                    }
                  />
                  <Route
                    path="/update/:id"
                    element={
                      <EditDoctor
                        doctors={doctors}
                        onUpdateDoctor={onUpdateDoctor}
                        snackbarMessage={snackbarMessage}
                        snackbarOpen={snackbarOpen}
                        setSnackbarOpen={setSnackbarOpen}
                        showSnackbar={showSnackbar}
                      />
                    }
                  />
                  {/* /:id the path shouldn't be like this /employee/:id */}

                  <Route
                    path="/create"
                    element={
                      <AddDoctor
                        snackbarMessage={snackbarMessage}
                        setSnackbarOpen={setSnackbarOpen}
                        snackbarOpen={snackbarOpen}
                        showSnackbar={showSnackbar}
                        validateField={validateField}
                        checkValidation={checkValidation}
                      />
                    }
                  />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </main>
            </>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
