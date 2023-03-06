import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Portfolio from "./Components/Portfolio/Portfolio";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Teams from "./Components/Teams/Teams";
import Services from "./Components/Services/Services";
import { Contact } from "./Components/Contact Us/Contact";
import emailjs from "@emailjs/browser";

import "./App.css";
const App = (React.FC = () => {
let path = document.URL.substring(1+document.URL.lastIndexOf('/'),document.URL.length);
switch (path) {
  case 'portfolio':{
    localStorage.setItem('selectedIndex', '1')
    localStorage.setItem('selectedTab', '1')
    break;
  }
  case 'teams':{
    localStorage.setItem('selectedIndex', '2')
    localStorage.setItem('selectedTab', '2')
    break;
  }
  case 'services':{
    localStorage.setItem('selectedIndex', '3')
    localStorage.setItem('selectedTab', '3')
    break;
  }
  case 'contact':{
    localStorage.setItem('selectedIndex', '4')
    localStorage.setItem('selectedTab', '4')
    break;
  }
  default:
    localStorage.setItem('selectedIndex', '0')
    localStorage.setItem('selectedTab', '0')
    break;
} 
      
  const publicKey = "_6Td844_fKAwDRtj4";
  emailjs.init(publicKey);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
      <Footer />
    </>
  );
});

export default App;
