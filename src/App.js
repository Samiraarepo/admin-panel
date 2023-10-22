import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom"; //????????
import Table from "./components/Table";
import Form from "./components/EmployeeInfo";
import ErrorPage from "./components/ErrorPage";
import EditEmployee from "./components/EditEmployee";
import axios from "axios";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  const [employees, setEmployees] = useState([]);

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
    <div className="app">
      <>
        <Link to="/"> Table </Link>
        <br />
        <Link to="/form"> Form </Link>
        <br />
        <Link to="/employee"> Employees </Link>

        <Routes>
          <Route path="/" element={<Table />} />
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
      </>
    </div>
  );
}

export default App;
