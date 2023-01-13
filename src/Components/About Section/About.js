import {
  faHandshakeAngle,
  faHeadset,
  faPeopleArrows,
  faPersonDigging,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./About.css";

const About = () => {
  const os = useState(window.navigator.platform);
  const [device, setDevice] = useState(false);
  const [desk, setDesk] = useState(false);

  document.addEventListener("scroll", (evt) => {
    if (
      (os[0].toLowerCase().includes("android") ||
        os[0].toLowerCase().includes("ios")) &&
      window.scrollY >= 430
    ) {
      setDevice(true);
      setDesk(false);
    } else if (window.scrollY >= 600) {
      setDevice(false);
      setDesk(true);
    } else {
      setDevice(false);
      setDesk(false);
    }
  });
  return (
    <div>
      <div className="container py-5">
        <p className="heading-font">
          <span className="heading-border-bottom">What</span> We Do
        </p>
        <h2 className="text2 pt-2">
          Our services are defined by quality and commitment.
        </h2>
      </div>
      <div className="card-div-wrapper">
        <div className="card-div">
          <div className="container card-inner-div py-5">
            <div className="row">
              <div
                className={
                  device || desk
                    ? "col-lg-3 col-md-6 about-card about-card1"
                    : "col-lg-3 col-md-6 about-card"
                }
              >
                <div className="p-4 card-inner">
                  <FontAwesomeIcon
                    icon={faPeopleArrows}
                    className="card-icon"
                  ></FontAwesomeIcon>
                  <h4 className="card-heading">Consulting</h4>
                  <p className="card-text">
                    We help you create a clear digital strategy that optimizes
                    your path to comprehensive, technology-led business success.
                  </p>
                </div>
              </div>
              <div
                className={
                  device || desk
                    ? "col-lg-3 col-md-6 about-card about-card1"
                    : "col-lg-3 col-md-6 about-card"
                }
              >
                <div className="p-4 card-inner">
                  <FontAwesomeIcon
                    icon={faPersonDigging}
                    className="card-icon"
                  ></FontAwesomeIcon>
                  <h4 className="card-heading">Implementation</h4>
                  <p className="card-text">
                    Our expertise spans all major technologies and business
                    functions, empowering us to deliver comprehensive business
                    solutions.
                  </p>
                </div>
              </div>
              <div
                className={
                  device || desk
                    ? "col-lg-3 col-md-6 about-card about-card1"
                    : "col-lg-3 col-md-6 about-card"
                }
              >
                <div className="p-4 card-inner">
                  <FontAwesomeIcon
                    icon={faHandshakeAngle}
                    className="card-icon"
                  ></FontAwesomeIcon>
                  <h4 className="card-heading">Managed Services</h4>
                  <p className="card-text">
                    Our global Managed Services teams secure your digital
                    investment with 24x7 monitoring, maintenance, and end-to-end
                    support.
                  </p>
                </div>
              </div>
              <div
                className={
                  device || desk
                    ? "col-lg-3 col-md-6 about-card about-card1"
                    : "col-lg-3 col-md-6 about-card"
                }
              >
                <div className="p-4 card-inner">
                  <FontAwesomeIcon
                    icon={faHeadset}
                    className="card-icon"
                  ></FontAwesomeIcon>
                  <h4 className="card-heading">BPO</h4>
                  <p className="card-text">
                    Our trained and experienced teams of BPO professionals
                    deliver an instant boost to your workforce with on-time,
                    high-quality results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
