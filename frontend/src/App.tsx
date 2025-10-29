import React from "react";
import { Routes, Route } from "react-router-dom";
import Experiences from "./pages/Home";
import ExperienceDetails from "./pages/ExperienceDetails";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";

const App: React.FC = () => {
  return (
    <Routes>
     
      <Route path="/" element={<Experiences />} />
      <Route path="/experience/:id" element={<ExperienceDetails />} />
      <Route path="/checkout" element={<Checkout />} />
        <Route path="/result" element={<Result />} />
    </Routes>
  );
};

export default App;
