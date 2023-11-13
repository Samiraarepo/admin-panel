import React from "react";
import { useMode, ColorModeContext } from "./theme";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./layouts/dashboard";
import DoctorTable from "./components/DoctorTable";
import DoctorInfo from "./components/DoctorInfo";
import ErrorPage from "./components/ErrorPage";
import EditDoctor from "./components/EditDoctor";
import AddDoctor from "./components/AddDoctor";
import Sidebar from "./layouts/global/Sidebar";

function App() {
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
                        showSnackbar={showSnackbar}
                        validateField={validateField}
                        checkValidation={checkValidation}
                      />
                    }
                  />
                  <Route
                    path="/update/:id"
                    element={
                      <EditDoctor
                        formData={formData}
                        setFormData={setFormData}
                        formErrors={formErrors}
                        setFormErrors={setFormErrors}
                        snackbarMessage={snackbarMessage}
                        snackbarOpen={snackbarOpen}
                        setSnackbarOpen={setSnackbarOpen}
                        showSnackbar={showSnackbar}
                        checkValidation={checkValidation}
                        validateField={validateField}
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
