import React from "react";
import HeroSection from "./Components/Hero Section/HeroSection";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
import AboutSection from "./Components/About Section/AboutSection";
import Experties from "./Components/Experties/Experties";

const App = (React.FC = () => {
  return (
    <div>
      <div className="main-body">
        <NavBar />
        <HeroSection />
      </div>
      <AboutSection />
      <Experties />
    </div>
  );
});

export default App;
