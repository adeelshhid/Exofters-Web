import React from "react";
import HeroSection from "./Components/Hero Section/HeroSection";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
import About from "./Components/About Section/About";

const App = (React.FC = () => {
  return (
    <div>
      <div className="main-body">
        <NavBar />
        <HeroSection />
      </div>
      <About />
    </div>
  );
});

export default App;
