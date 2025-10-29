import React from "react";
import { Routes, Route } from "react-router-dom";
import Experiences from "./pages/Home";
import ExperienceDetails from "./pages/ExperienceDetails";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Experiences />} />

      {/* Experience Details Page */}
      <Route path="/experience/:id" element={<ExperienceDetails />} />
    </Routes>
  );
};

export default App;
