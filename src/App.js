import React, { useEffect, useState } from "react";
import { useMode, ColorModeContext } from "./theme";
// import { ThemeProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom"; //????????

import Dashboard from "./layouts/dashboard";
import Table from "./components/Table";
import Form from "./components/EmployeeInfo";
import ErrorPage from "./components/ErrorPage";
import EditEmployee from "./components/EditEmployee";
import axios from "axios";
import Sidebar from "./layouts/global/Sidebar";

function App() {
  const [employees, setEmployees] = useState([]);
  const [theme, colorMode] = useMode();
  // Use useParams to access the id parameter from the URL
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Only make the GET request if id is defined (i.e., when visiting /user/:id route)
      axios
        .get(`http://localhost:3005/user/${id}`)
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          alert("Error fetching employee data:", error);
        });
    }
  }, [id]);

  const onUpdateEmployee = (formData) => {
    // Find the index of the employee to update in the employees array
    const employeeIndex = employees.findIndex((emp) => emp.id === formData.id);

    if (employeeIndex !== -1) {
      // Create a copy of the employees array
      const updatedEmployees = [...employees];

      // Update the employee with the new data
      updatedEmployees[employeeIndex] = formData;

      // Update the state with the new array
      setEmployees(updatedEmployees);
    }
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <>
            {/* <Link to="/table"> Table </Link>
            <br />
            <Link to="/form"> Form </Link>
            <br />
            <Link to="/employee"> Employees </Link>
            <br />
            <Link to="/"> Dashboard </Link> */}
            <Sidebar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/table" element={<Table />} />
                <Route path="/form" element={<Form />} />
                <Route
                  path="/user/:id"
                  element={
                    <EditEmployee
                      employees={employees}
                      onUpdateEmployee={onUpdateEmployee}
                    />
                  }
                />
                {/* /:id the path shouldn't be like this /employee/:id */}

                <Route path="/employee" element={<EditEmployee />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </main>
          </>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
