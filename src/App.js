import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Portfolio from "./Components/Portfolio/Portfolio";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Teams from "./Components/Teams/Teams";
import Services from "./Components/Services/Services";

const App = (React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </>
  );
});

export default App;
