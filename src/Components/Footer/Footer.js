import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbTack,
  faLocationArrow,
  faMobileScreenButton,
  faFax,
  faEnvelope,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  let links = [
    {
      id: 1,
      icon: faThumbTack,
      info: "Exofters Pvt Ltd",
    },
    {
      id: 2,
      icon: faLocationArrow,
      info: "257A G5, Phase 1, Wapda Town, Lahore",
    },
    {
      id: 3,
      icon: faMobileScreenButton,
      info: "Tel +92 (300) 7171787",
    },
    {
      id: 4,
      icon: faFax,
      info: "Tel +92 (321) 7171787",
    },
  ];

  let contacts = [
    {
      id: 1,
      icon: faEnvelope,
      info: "info@exofters.site",
    },
    {
      id: 2,
      icon: faGlobe,
      info: "www.exofters.site",
    },
  ];

  return (
    <div className="footer-section">
      <div className="container pt-5">
        <div className="row footer-row">
          <div className="col-lg-6">
            <p className="aboutexofters-heading">About Exofters</p>
            <p className="aboutexofters-text">
            As Exofters, we are a highly experienced and certified company specializing in developing richly featured and responsive mobile applications, web applications, and websites. We are a self-driven, flexible, and innovative organization that operates across various domains, including websites, mobile applications, machine learning, IoT, and artificial intelligence.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 px-0">
                {links.map((item) => {
                  return (
                    <ul key={item.id} className="info-list">
                      <li>
                        <FontAwesomeIcon
                          className="info-icons pe-2"
                          icon={item.icon}
                        />
                        <span className="info-text">{item.id === 3 || item.id === 4 ? <a className="footer-link" href={'tel:' + item.info}>
                          {item.info}</a> : item.info}

                        </span>
                      </li>
                    </ul>
                  );
                })}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 px-0">
                {contacts.map((item) => {
                  return (
                    <ul key={item.id} className="info-list">
                      <li>
                        <FontAwesomeIcon
                          className="info-icons pe-2"
                          icon={item.icon}
                        />
                        <span className="info-text">
                          <a className="footer-link" href="/">
                            {item.info}
                          </a>
                        </span>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="container d-flex justify-content-between pt-3">
          <p className="copyright">
            &#169; Copyright Exofters Pvt Ltd, Pakistan
          </p>
          <div>
            <a className="footer-link2" href="/" onClick={() =>{
              localStorage.setItem('selectedIndex','0')
            }}>
              Home
            </a>
            <a className="footer-link2" href="/contact" onClick={() =>{
              localStorage.setItem('selectedIndex','4')
            }}>
              Contact Us
            </a>
            <a className="footer-link2" href="/">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
