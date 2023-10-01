import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import Table from "./components/Table";
import Form from "./components/EmployeeInfo";
import ErrorPage from "./components/ErrorPage";
import EditEmployee from "./components/EditEmployee";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("./MockData/sample.json")
      .then((response) => setEmployees(response.data));
  }, []);

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
        <Router>
          <Switch>
            <Route path="/edit/:id">
              <EditEmployee
                employees={employees}
                onUpdateEmployee={onUpdateEmployee}
              />
            </Route>
            {/* Other routes */}
            <Routes>
              <Route path="/" element={<Table />} />
              <Route path="/form" element={<Form />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/employee" element={<EditEmployee />} />
            </Routes>
          </Switch>
        </Router>
      </>
    </div>
  );
}

export default App;
