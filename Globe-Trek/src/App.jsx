import { Routes, Route } from "react-router-dom";
import Test from "./test.jsx";
import GlobePage from "./GlobePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GlobePage />} />
    </Routes>
  );
}

export default App;
