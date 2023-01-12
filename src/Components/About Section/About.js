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
          <div className="square bg-orange d-flex-col p-1">
            <h6>Flexible Model</h6>
            <p>
              Whether you’re seeking a project basis relationship or you’d like to add three remote developers to an ongoing project, we can accommodate. Victory is yours!
            </p>
          </div>
        </div>
        <div className="col d-flex-col">
          <div className="rect-small bg-skin d-flex-col p-1">
            <h6>Documentation</h6>
            <p>
              We document our steps in detail and keep it up to date, so that your extended thoughts can incorporate.
            </p>

          </div>
          <div className="square bg-cyan d-flex-col p-1">
            <h6>Experience</h6>
            <p>
              Yes it’s true, we lock our employees’ CVs in a vault. If anyone saw them it’d be hard to keep ‘em on our team. Organizationally we also have tons of business experience in various markets. We’re not just keystroking nerds.
            </p>
          </div>
        </div>
        <div className="col d-flex-col">
          <div className="rect-long bg-yellow d-flex-col p-2">
            <h4>Agile</h4>
            <p>
              Our agile team guides you through every stage of the project. We transform your idea into a scalable and innovative platform, ensuring that your technology adds value to your users’ experience, while being aligned with your overall business plans and objectives.
            </p>
          </div>
        </div>
        <div className="col d-flex-col">
          <div className="square bg-orange2 d-flex-col p-1">
            <h6>Super Talented</h6>
            <p>
              If there is a development technology or methodology our staffed software engineers aren’t intimately familiar with it, please show us. These guys rock, hard.
            </p>
          </div>
          <div className="rect-small bg-sky d-flex-col p-1">

            <h6>Leadership</h6>
            <p>
              We’re not just order takers. We will consult on new methods and the latest technology.
            </p>

          </div>
        </div>
        <div className="col d-flex-col">
          <div className="square bg-green d-flex-col p-1">
            <h6>Smiles</h6>
            <p>
              Tons and tons of them. We’re committed to your success so that’s why you have a state-side liaison and a project manager making sure your goals are being realized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
