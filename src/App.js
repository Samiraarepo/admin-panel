import { Routes, Route, Link } from "react-router-dom";
import Table from "./components/Table";
import Form from "./components/EmployeeInfo";
import ErrorPage from "./components/ErrorPage";
import EmployeePage from "./components/NewPage";

function App() {
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
          <Route path="*" element={<ErrorPage />} />
          <Route path="/employee" element={<EmployeePage />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
