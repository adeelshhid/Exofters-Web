import React from "react";
import { Button } from "react-bootstrap";
import "./Teams.css";
import ceoImg from "../../Images/ceo1.jpg";
import fucker from "../../Images/Screenshot_20230226_185326.jpg";
import HotHoney from "../../Images/IMG_E3805.JPG";
import jackass from "../../Images/ceo2.jpeg";
import choondi from "../../Images/WhatsApp Image 2023-02-26 at 19.34.31.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Teams = () => {


  const team = [
    {
      id: 1,
      img: ceoImg,
      name: "Adeel Shahid",
      designation: "CEO, Co-Founder, Team Lead",
      experties: `I’m well educated an expert full stack mobile developer developer having +6 year of experience and  i can handle backend and frontend both.
        I’ve done several rich features in responsive apps using ionic with angular, react, cordova and capacitor. I also have excellent organisational and time management skills. I’m Self-driven, flexible, and innovative.
        Strong command over:  * HTML5 * CSS3 * API’s developemnt * TypeScript * JavaScript * Vue * Angular * ReactNative * ReactJS * Flutter * Ionic * Laravel * CodeIgnitor * IOS/Android * NodeJS * Firebase * MongoDB * Cordova * Capacitor * ElectronJS * jQuery * Php * AWS deployment * Swagger * Postman * Azure * DigitalOcean deployment * E-commerce. * Woo-commerce. * Chatting Apps. * Location based Apps. * FinTech * Blockchain Apps. * Management Apps. * API integration. * Push notifications using FCM or One Signal. * InApp Payments. * OAuth (Social Logins i.e Facebook, google or Apple)`,
    },
    {
      id: 2,
      img: jackass,
      name: "Zeeshan Aziz",
      designation: "CEO, Co-Founder, Bussines Manager",
      experties:
        "Zeeshan Aziz is a dedicated and highly motivated software business manager who exhibits excellent leadership and problem-solving skills. He is an inspiring leader with a knack for developing innovative strategies to help businesses achieve success. His passion for technology and commitment to customer service make him an invaluable asset to Exofters Pvt Ltd.",
    },
    {
      id: 3,
      img: fucker,
      name: "Ali Shahid",
      designation: "App Developer",
      experties:
        "Ali Shahid is an extremely talented software developer with a deep understanding of * HTML * CSS *JavaScript * Ionic * Angular. He is highly motivated, creative, and dedicated to his craft, and consistently produces exceptional results. He is an invaluable asset to Exofters Pvt Ltd.",
    },
    {
      id: 4,
      img: choondi,
      name: "Talha Tariq",
      designation: "App Developer",
      experties:
        "Talha Tariq is an exceptionally talented and experienced software developer. He is highly skilled in * HTML * CSS * JavaScript * Ionic * Angular and has a keen eye for detail. He is passionate about creating innovative solutions to complex problems and is dedicated to delivering the highest quality of work.",
    },
    {
      id: 5,
      img: HotHoney,
      name: "Amir Shahzad",
      designation: "Web Developer",
      experties:
        "Amir Shahzad is an accomplished software developer with impressive technical prowess in * HTML * CSS * JavaScript * React * Bootstrap. He has a keen eye for detail and is dedicated to producing high-quality work. His passion for coding is evident in his strong commitment to continual learning and development.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="teams-hero-section">
        <p className="main-text1">We are happy to hear from them.</p>
        <p className="teams-main-text2">Join our world class team</p>
        <p className="main-text3">and start your rewarding journy with us</p>
        <p className="main-text4">
          Have fun solving complex problems in a healthy & productive
          environment.
        </p>
        <Button href="/contact" className="teams-start-btn">
          Join Our Team!
        </Button>
      </div>

      {/* Team People Section */}

      <div className="px-5 py-5">
        <h3 className="team-heading">Our Team</h3>
        <div className="row teams-row pt-5">
          {team.map((item) => {
            if (item.id % 2 === 0) {
              return (
                <>
                  <div className="col-lg-6 col-md-6 px-md-5 d-flex flex-column justify-content-center align-items-md-center">
                    <h3> {item.name} </h3>
                    <h6 className="fst-italic"> {item.designation} </h6>
                    <p> {item.experties} </p>
                    <div>
                      <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faFacebookF}
                          className="social-icon-fb"
                        />
                      </a>
                      <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className="social-icon-inst"
                        />
                      </a>
                      <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faTwitter}
                          className="social-icon-tw"
                        />
                      </a>
                      <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className="social-icon-ln"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 pt-5 d-flex justify-content-center ">
                    <img src={item.img} alt="" className="team-img" />
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="col-lg-6 col-md-6 pt-5 d-flex justify-content-center ">
                    <img src={item.img} alt="" className="team-img" />
                  </div>
                  <div className="col-lg-6 col-md-6 px-md-5 d-flex flex-column justify-content-center align-items-md-center">
                    <h3> {item.name} </h3>
                    <h6 className="fst-italic"> {item.designation} </h6>
                    <p className="experties-text"> {item.experties} </p>
                    <div>
                      <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faFacebookF}
                          className="social-icon-fb"
                        />
                      </a>
                      <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className="social-icon-inst"
                        />
                      </a>
                      <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faTwitter}
                          className="social-icon-tw"
                        />
                      </a>
                      <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={faLinkedinIn}
                          className="social-icon-ln"
                        />
                      </a>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
        <div className="row teams-row2">
          {team.map((item) => {
            return (
              <>
                <div className="col-lg-6 col-md-6 pt-5 d-flex justify-content-center ">
                  <img src={item.img} alt="" className="team-img" />
                </div>
                <div className="col-lg-6 col-md-6 px-md-5 member-info d-flex flex-column justify-content-center align-items-md-center">
                  <h3> {item.name} </h3>
                  <h6 className="fst-italic"> {item.designation} </h6>
                  <p className="experties-text"> {item.experties} </p>
                  <div>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="social-icon-fb"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="social-icon-inst"
                      />
                    </a>
                    <a
                      href="https://www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="social-icon-tw"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedinIn}
                        className="social-icon-ln"
                      />
                    </a>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Teams;
