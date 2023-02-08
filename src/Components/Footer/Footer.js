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
      icon: faThumbTack,
      info: "Exofters Pvt Ltd",
    },
    {
      icon: faLocationArrow,
      info: "257A G5, Phase 1, Wapda Town, Lahore",
    },
    {
      icon: faMobileScreenButton,
      info: "Tel +92 (300) 7171787",
    },
    {
      icon: faFax,
      info: "Fax +92 (52) 1234567",
    },
  ];

  let contacts = [
    {
      icon: faEnvelope,
      info: "info@exofters.com",
    },
    {
      icon: faGlobe,
      info: "www.exofters.com",
    },
  ];

  return (
    <div className="footer-section">
      <div className="container pt-5">
        <div className="row footer-row">
          <div className="col-lg-6">
            <p className="aboutexofters-heading">About Exofters</p>
            <p className="aboutexofters-text">
              We are Exofters, an App development company located in Sialkot,
              Pakistan. We are a team of high-qualified developers with
              allegiance for mobility, talent for app engineering and knowledge
              for vectoring your ideas into the right direction so they can
              reach into the hands of the avid users.
            </p>
          </div>
          <div className="col-lg-3">
            {links.map((item) => {
              return (
                <ul className="info-list">
                  <li>
                    <FontAwesomeIcon
                      className="info-icons pe-2"
                      icon={item.icon}
                    />
                    <span className="info-text">{item.info}</span>
                  </li>
                </ul>
              );
            })}
          </div>
          <div className="col-lg-3">
            {contacts.map((item) => {
              return (
                <ul className="info-list">
                  <li>
                    <FontAwesomeIcon
                      className="info-icons pe-2"
                      icon={item.icon}
                    />
                    <span className="info-text">
                      <a className="footer-link" href={item.info}>
                        {item.info}
                      </a>
                    </span>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between pt-3">
          <p className="copyright">
            &#169; Copyright Exofters Pvt Ltd, Pakistan
          </p>
          <div>
            <a className="footer-link2" href="./">
              Home
            </a>
            <a className="footer-link2" href="./">
              Contact Us
            </a>
            <a className="footer-link2" href="./">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
