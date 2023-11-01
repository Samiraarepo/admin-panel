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
import { TextField } from "@mui/material";

export default function DoctorTable() {
  const [doctors, setDoctors] = useState([
    {
      id: 0,
      name: "",
      specialty: "",
      location: "",
      phone: 0,
      email: "",
    },
  ]);
  const [orderBy, setOrderBy] = useState("doctor_name");
  const [order, setOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("./sample.json")
      .then((response) => {
        setDoctors(response.data);
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
  // Sorting and Filtering logic
  const sortedAndFilteredDoctors = doctors
    .slice()
    .sort((a, b) => {
      const orderMultiplier = order === "asc" ? 1 : -1;
      if (orderBy === "doctor_ID") {
        return orderMultiplier * (a.id - b.id);
      } else if (orderBy === "doctor_name") {
        return orderMultiplier * a.name.localeCompare(b.name);
      } else if (orderBy === "doctor_specialty") {
        return orderMultiplier * a.specialty.localeCompare(b.specialty);
      }
      return 0;
    })
    .filter((doctor) => {
      return (
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "doctor_ID"}
                  direction={orderBy === "doctor_ID" ? order : "asc"}
                  onClick={() => handleSortRequest("doctor_ID")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "doctor_name"}
                  direction={orderBy === "doctor_name" ? order : "asc"}
                  onClick={() => handleSortRequest("doctor_name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "doctor_specialty"}
                  direction={orderBy === "doctor_specialty" ? order : "asc"}
                  onClick={() => handleSortRequest("doctor_specialty")}
                >
                  Specialty
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAndFilteredDoctors.map((docotor) => (
              <TableRow
                key={docotor.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {docotor.id}
                </TableCell>
                <TableCell align="left">{docotor.name}</TableCell>
                <TableCell align="left">{docotor.specialty}</TableCell>
                <TableCell align="left">{docotor.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
