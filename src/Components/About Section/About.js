import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="text-center p-5">
      <h3>Who We Are?</h3>
      <p className="about-para">
        We are Exofters. We are a well experienced and certified Company. We’ve
        done several rich features / responsive Mobile Apps, Webapps and
        Websites. We are a self-driven, flexible, and innovative company. We
        work in all domains including Websites, Mobile apps, Machine Learning,
        iOT and Artificial Intelligence.
      </p>
      <div className="custom-grid">
        <div className="col d-flex-col">
          <div className="square bg-orange"></div>
        </div>
        <div className="col d-flex-col">
          <div className="rect-small bg-skin"></div>
          <div className="square bg-cyan"></div>
        </div>
        <div className="col d-flex-col">
          <div className="rect-long bg-yellow"></div>
        </div>
        <div className="col d-flex-col">
          <div className="square bg-orange2"></div>
          <div className="rect-small bg-sky"></div>
        </div>
        <div className="col d-flex-col">
          <div className="square bg-green"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
