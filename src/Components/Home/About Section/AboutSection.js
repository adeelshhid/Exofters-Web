import React from "react";
import {
  faGears,
  faHandshake,
  faHeadset,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";
import "../About Section/AboutSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ceo1 from "../../../Images/ceo1.jpg";
import ceo2 from "../../../Images/ceo2.jpeg";

const AboutSection = () => {
  return (
    <div className="about-bg">
      {/* About Heading Section*/}
      <div className="about-section pt-5 px-5">
        <h2 className="about-heading">What We Do</h2>
        <p className="about-text pt-4">
          Our services are defined by quality and commitment.
        </p>
      </div>

      {/* About Cards Section*/}
      <div className="card-section pt-5 px-5">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 about-card">
            <div className="card-bg p-4">
              <FontAwesomeIcon className="card-icon" icon={faPeopleArrows} />
              <h4 className="card-heading pt-4">Consulting</h4>
              <p className="card-text pt-2">
                We help you create a clear digital strategy that optimizes your
                path to comprehensive, technology-led business success.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 about-card">
            <div className="card-bg p-4">
              <FontAwesomeIcon className="card-icon" icon={faGears} />
              <h4 className="card-heading pt-4">Implementation</h4>
              <p className="card-text pt-2">
                Our expertise spans all major technologies and business
                functions, empowering us to deliver comprehensive business
                solutions.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 about-card">
            <div className="card-bg p-4">
              <FontAwesomeIcon className="card-icon" icon={faHandshake} />
              <h4 className="card-heading pt-4">Managed Services</h4>
              <p className="card-text pt-2">
                Our global Managed Services teams secure your digital investment
                with 24x7 monitoring, maintenance, and end-to-end support.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 about-card">
            <div className="card-bg p-4">
              <FontAwesomeIcon className="card-icon" icon={faHeadset} />
              <h4 className="card-heading pt-4">BPO</h4>
              <p className="card-text pt-2">
                Our trained and experienced teams of BPO professionals deliver
                an instant boost to your workforce with on-time, high-quality
                results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Philosophy Section */}
      <div className="our-phil-bg pb-3">
        <div className="our-phil-section">
          <h2 className="our-phil-heading text-center">Our Philosophy</h2>
          <p className="our-phil-text text-center pt-5">
            Rapid innovation is an essential feature of digital information
            technology.
          </p>
          <p className="our-phil-text2 text-center px-5">
            Exofters Limited understands the importance of remaining current
            through frequent self-reinvention. We accomplish this by continually
            attracting the brightest minds in modern digital paradigms and
            platforms. By maintaining a roster of skilled technology
            professionals across every business function, Systems Limited
            distinguishes itself by offering its client organizations a single
            touchpoint to address all of their enterprise technology needs.
          </p>
        </div>

        {/* Ceo Image Section */}
        <div className="container mt-5 ceo-img-section">
          <div className="row">
            <div className="col-lg-6 col-md-6 d-flex align-items-center">
              <img src={ceo1} className="ceo1" alt="" />
              <div className="ps-3">
                <h2 className="ceo-name">Adeel Shahid, Co-Founder</h2>
                <h5 className="fst-italic white-text msg-text">Message</h5>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 d-flex align-items-center">
              <img src={ceo2} className="ceo2" alt="" />
              <div className="ps-3">
                <h2 className="ceo-name">Zeeshan Aziz, Co-Founder</h2>
                <h5 className="fst-italic white-text msg-text">Message</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ceo Image Section */}
      <div className="container ceo-info-section mt-sm-5">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="d-flex align-items-center ceo-img-section2">
              <img src={ceo1} className="ceo1" alt="" />
              <div className="ps-3">
                <h2 className="ceo-name">Adeel Shahid, Co-Founder</h2>
                <h5 className="fst-italic white-text msg-text">Message</h5>
              </div>
            </div>
            <p className="grey-text ceo-msg text-center py-sm-4">
              Investing in our people is of critical importance as we move
              forward. Systems Limited believes in reinventing itself every few
              years, which is why we have grown over the past four decades. We
              have created a culture that allows us to foster innovation in its
              broader sense and focus on idea generation.We have invested in
              solution development to solve complex business problems, which is
              one of our key strengths — to be an industry problem solver
              through dynamic business solutions.
            </p>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="d-flex align-items-center ceo-img-section2">
              <img src={ceo2} className="ceo2" alt="" />
              <div className="ps-3">
                <h2 className="ceo-name">Zeeshan Aziz, Co-Founder</h2>
                <h5 className="fst-italic white-text msg-text">Message</h5>
              </div>
            </div>
            <p className="grey-text ceo-msg text-center py-sm-4">
              Investing in our people is of critical importance as we move
              forward. Systems Limited believes in reinventing itself every few
              years, which is why we have grown over the past four decades. We
              have created a culture that allows us to foster innovation in its
              broader sense and focus on idea generation.We have invested in
              solution development to solve complex business problems, which is
              one of our key strengths — to be an industry problem solver
              through dynamic business solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
