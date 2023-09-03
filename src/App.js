import { Routes, Route, Link } from "react-router-dom";
import Table from "./components/Table";

function App() {
  return (
    <div className="app">
      <>
        <Link to="/table"> Table </Link>
        <Routes>
          <Route path="/" element={<Table />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
