import { Routes, Route, Link } from "react-router-dom";
import Table from "./components/Table";
import Form from "./components/employeeForm";

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
        </Routes>
      </>
    </div>
  );
}

export default App;
