import React from "react";
import HeroSection from "./Components/Hero Section/HeroSection";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";

const App = (React.FC = () => {
  return (
    <div>
      <div className="main-body">
        <NavBar />
        <HeroSection />
      </div>
    </div>
  );
});

export default App;
