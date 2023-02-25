import React from "react";
import HeroSection from "./Hero Section/HeroSection";
import NavBar from "./NavBar/NavBar";
import AboutSection from "./About Section/AboutSection";
import Experties from "./Experties/Experties";
import WhyExofters from "./Why Exofters/WhyExofters";
import Footer from "./Footer/Footer";

const Home = () => {
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
};

export default Home;
