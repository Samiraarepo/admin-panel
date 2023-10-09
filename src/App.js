import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; //????????
import Table from "./components/Table";
import Form from "./components/EmployeeInfo";
import ErrorPage from "./components/ErrorPage";
import EditEmployee from "./components/EditEmployee";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState({
    id: 0,
    name: "",
    age: "0",
    department: "",
  });

  useEffect(() => {
    axios
      .get("./sample.json", {
        userId: employees.id,
        name: employees.name,
        age: employees.age,
        department: employees.department,
      })
      .then((response) => setEmployees(response.data));
  }, [employees.id, employees.name, employees.age, employees.department]);

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
            path="/:id"
            element={
              <EditEmployee
                employees={employees}
                onUpdateEmployee={onUpdateEmployee}
              />
            }
          />
          {/* the path shouldn't be like this /employee/:id*/}

          <Route path="/employee" element={<EditEmployee />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
