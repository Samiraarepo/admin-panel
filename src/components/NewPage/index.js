// Sample array of employee objects
const employees = [
  { id: 101, name: "John Doe", age: 30, department: "HR" },
  { id: 123, name: "Jane Smith", age: 25, department: "IT" },
  { id: 202, name: "Alice Johnson", age: 28, department: "Marketing" },
];

// Route handler for localhost:3000/employee123
const loadEmployeeById = (employeeId) => {
  const employee = employees.find((emp) => emp.id === employeeId);

  if (!employee) {
    return null; // Employee not found
  }

  // Populate the form with employee data
  document.getElementById("employeeName").value = employee.name;
  document.getElementById("employeeAge").value = employee.age;
  document.getElementById("employeeDepartment").value = employee.department;

  return employee;
};

// Event listener for form submission (update employee data)
document.getElementById("employeeForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the employee ID from the URL (assuming you're using client-side routing)
  const employeeId = parseInt(window.location.pathname.split("/").pop(), 10);

  // Find the employee in the array
  const employeeIndex = employees.findIndex((emp) => emp.id === employeeId);

  if (employeeIndex === -1) {
    alert("Employee not found.");
    return;
  }

  // Update the employee object with the form data
  employees[employeeIndex].name = document.getElementById("employeeName").value;
  employees[employeeIndex].age = parseInt(
    document.getElementById("employeeAge").value
  );
  employees[employeeIndex].department =
    document.getElementById("employeeDepartment").value;

  // You can save the updated data to your server or perform any other necessary actions here

  alert("Employee data updated successfully!");
});

// Example: Load employee with ID 123 when the page loads (you can trigger this on route change)
loadEmployeeById(123);
