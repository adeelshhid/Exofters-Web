import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import Portfolio from "./Components/Portfolio/Portfolio";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Teams from "./Components/Teams/Teams";
import Services from "./Components/Services/Services";
import { Contact } from "./Components/Contact Us/Contact";
import emailjs from "@emailjs/browser";
import "./App.css";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    emailjs.init("_6Td844_fKAwDRtj4");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
