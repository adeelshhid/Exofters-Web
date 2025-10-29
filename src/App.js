import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home/Home";
import Portfolio from "./Components/Portfolio/Portfolio";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Teams from "./Components/Teams/Teams";
import Services from "./Components/Services/Services";
import { Contact } from "./Components/Contact Us/Contact";
import Loading from "./Components/Loading/Loading";
import BackToTop from "./Components/BackToTop/BackToTop";
import NotFound from "./Components/NotFound/NotFound";
import emailjs from "@emailjs/browser";
import "./App.css";

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    emailjs.init("_6Td844_fKAwDRtj4");
    setTimeout(() => setLoading(false), 2500);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {loading && <Loading />}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
};

export default App;
