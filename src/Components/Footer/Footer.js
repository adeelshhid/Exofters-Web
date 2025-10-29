import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./footer.css";
import Images from "../../ImageExport";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <img src={Images.companylogo} alt="Exofters" className="footer-logo" />
          <p>
            We are a team of passionate developers and designers creating exceptional digital experiences for businesses worldwide.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/services">Services</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul className="footer-links">
            <li><a href="#mobile">Mobile Development</a></li>
            <li><a href="#web">Web Development</a></li>
            <li><a href="#cloud">Cloud Solutions</a></li>
            <li><a href="#design">UI/UX Design</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul className="footer-links">
            <li><a href="tel:+923007171787">+92 (300) 7171787</a></li>
            <li><a href="mailto:contact@exofters.io">contact@exofters.io</a></li>
            <li><Link to="/contact">Get In Touch</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} EXOFTERS (PRIVATE) LIMITED. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
