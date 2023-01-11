import React from "react";
import HeroSection from "./Components/Hero Section/HeroSection";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
import IntroSection from "./Components/IntroSection/IntroSection";

const App = (React.FC = () => {
  return (
    <div>
      <div className="main-body">
        <NavBar />
        <HeroSection />
      </div>
      <IntroSection />
    </div>
  );
});

export default App;
