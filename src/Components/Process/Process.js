import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faPencilRuler, faCode, faRocket } from "@fortawesome/free-solid-svg-icons";
import "./Process.css";

const Process = () => {
  const steps = [
    {
      icon: faLightbulb,
      title: "Discovery",
      desc: "We understand your vision, goals, and requirements through detailed consultation",
      number: "01"
    },
    {
      icon: faPencilRuler,
      title: "Design",
      desc: "Creating wireframes and prototypes that bring your ideas to visual reality",
      number: "02"
    },
    {
      icon: faCode,
      title: "Development",
      desc: "Building robust, scalable solutions using cutting-edge technologies",
      number: "03"
    },
    {
      icon: faRocket,
      title: "Launch",
      desc: "Deploying your product and providing ongoing support for success",
      number: "04"
    }
  ];

  return (
    <section className="process-section">
      <div className="section-header">
        <div className="subtitle">Our Process</div>
        <h2>How We Work</h2>
        <p>A proven methodology that delivers exceptional results every time</p>
      </div>
      <div className="process-container">
        {steps.map((step, index) => (
          <div key={index} className="process-step">
            <div className="step-number">{step.number}</div>
            <div className="step-icon">
              <FontAwesomeIcon icon={step.icon} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            {index < steps.length - 1 && <div className="step-connector"></div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
