import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudyMaterial from "./pages/StudyMaterial";
import { StudyProvider } from "./context/StudyContextProvider";

function App() {
  return (
    <StudyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<StudyMaterial />} />
        </Routes>
      </BrowserRouter>
    </StudyProvider>
  );
}

export default App;