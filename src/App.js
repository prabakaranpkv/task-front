import "./App.scss";
import Form from "./Component/Form";
import List from "./Component/List";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <h2>Skills-Based Certifications</h2>
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route exact path="/list" element={<List />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
