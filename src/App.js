import HomePage from "./components/HomePage/HomePage";
import AddPage from "./components/AddPage/AddPage";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
