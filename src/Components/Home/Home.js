import React from "react";
import HeroSection from "./Hero Section/HeroSection";
import AboutSection from "./About Section/AboutSection";
import Experties from "./Experties/Experties";
import WhyExofters from "./Why Exofters/WhyExofters";

const Home = () => {
  let root = document.getElementById("root")
  root.style.opacity = 0.3
  setTimeout(() =>{
    root.style.opacity = 1
  },500)
  return (
    <div id="transit">
      <HeroSection />
      <AboutSection />
      <Experties />
      <WhyExofters />
    </div>
  );
};

export default Home;
