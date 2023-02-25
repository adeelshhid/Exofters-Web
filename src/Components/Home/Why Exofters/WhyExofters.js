import React from "react";
import "./WhyExofters.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faUsers,
  faLightbulb,
  faFileInvoice,
  faChartLine,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";

const WhyExofters = () => {
  let kudos = [
    {
      id: 1,
      icon: faChartPie,
      name: "Agile",
      text: "Our agile team guides you through every stage of the project. We transform your idea into a scalable and innovative platform, ensuring that your technology adds value to your users experience, while being aligned with your overall business plans and objectives.",
    },
    {
      id: 2,
      icon: faUsers,
      name: "Flexible Model",
      text: "Whether you're seeking a project basis relationship or you'd like to add three remote developers to an ongoing project, we can accommodate. Victory is yours!",
    },
    {
      id: 3,
      icon: faLightbulb,
      name: "Super talented",
      text: "If there is a development technology or methodology our staffed software engineers aren't intimately familiar with it, please show us. These guys rock, hard.",
    },
    {
      id: 4,
      icon: faFileInvoice,
      name: "Documentation",
      text: "We document our steps in detail and keep it up to date, so that your extended thoughts can incorporate.",
    },
    {
      id: 5,
      icon: faChartLine,
      name: "Experience",
      text: "Yes it's true, we lock our employees' CVs in a vault. If anyone saw them it'd be hard to keep 'em on our team. Organizationally we also have tons of business experience in various markets. We're not just keystroking nerds.",
    },
    {
      id: 6,
      icon: faFaceSmile,
      name: "Smiles",
      text: "Tons and tons of them. We're committed to your success so that's why you have a state-side liaison and a project manager making sure your goals are being realized.",
    },
  ];

  return (
    <div className="whyexofters-section py-5">
      <div className="container">
        <h3 className="whyexofters-heading">Why Exofters?</h3>
      </div>
      <div className="container pt-5">
        <div className="row">
          {kudos.map((item) => {
            return (
              <div className="col-lg-4 col-md-6 col-sm-6 pt-3" key={item.id}>
                <div className=" kudos-card">
                  <FontAwesomeIcon className="kudos-icon" icon={item.icon} />
                  <p className="kudos-name pt-4">{item.name}</p>
                </div>
                <p className="kudos-text">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyExofters;
