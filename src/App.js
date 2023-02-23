import React from "react";
import HeroSection from "./Components/Hero Section/HeroSection";
import NavBar from "./Components/NavBar/NavBar";
import AboutSection from "./Components/About Section/AboutSection";
import Experties from "./Components/Experties/Experties";
import WhyExofters from "./Components/Why Exofters/WhyExofters";
import Footer from "./Components/Footer/Footer";

const App = (React.FC = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <AboutSection />
      <Experties />
      <WhyExofters />
      <Footer />
    </div>
  );
});

export default App;
