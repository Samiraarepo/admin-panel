import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TableSortLabel from "@mui/material/TableSortLabel";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([
    {
      id: 0,
      name: "",
      age: 0,
      department: "",
    },
  ]);
  const [orderBy, setOrderBy] = useState("employee_name");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("./sample.json")
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Data:", error);
      });
  }, []); //https://dummy.restapiexample.com/api/v1/employees

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  //?!
  const sortedEmployees = employees.slice().sort((a, b) => {
    const orderMultiplier = order === "asc" ? 1 : -1;
    if (orderBy === "employee_ID") {
      return orderMultiplier * (a.id - b.id);
    } else if (orderBy === "employee_name") {
      return orderMultiplier * a.name.localeCompare(b.name);
    } else if (orderBy === "employee_age") {
      return orderMultiplier * (a.age - b.age);
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <TableSortLabel
                active={orderBy === "employee_ID"}
                direction={orderBy === "employee_ID" ? order : "asc"}
                onClick={() => handleSortRequest("employee_ID")}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">
              <TableSortLabel
                active={orderBy === "employee_name"}
                direction={orderBy === "employee_name" ? order : "asc"}
                onClick={() => handleSortRequest("employee_name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">
              <TableSortLabel
                active={orderBy === "employee_age"}
                direction={orderBy === "employee_age" ? order : "asc"}
                onClick={() => handleSortRequest("employee_age")}
              >
                Age
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedEmployees.map((employee) => (
            <TableRow
              key={employee.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {employee.id}
              </TableCell>
              <TableCell align="left">{employee.name}</TableCell>
              <TableCell align="left">{employee.age}</TableCell>
              <TableCell align="left">{employee.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
