import React from "react";
import { Button } from "react-bootstrap";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <p className="main-text1">You've found the</p>
      <p className="main-text2">
        Software development solution you were seeking
      </p>
      <p className="main-text3">
        It's not easy to find right talent at the right price.
      </p>
      <p className="main-text4">
        Now you can rely on a partner to help you get the products to market
        quickley and at a budget which maximizes the profit.
      </p>
      <Button href="/contact" className="start-btn">
        Start a project scope now!
      </Button>
    </div>
  );
};

export default HeroSection;
