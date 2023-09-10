import { Routes, Route, Link } from "react-router-dom";
import Table from "./components/Table";
import Form from "./components/EmployeeInfo";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div className="app">
      <>
        <Link to="/"> Table </Link>
        <br />
        <Link to="/form"> Form </Link>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/form" element={<Form />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
