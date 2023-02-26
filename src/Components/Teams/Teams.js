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
} from "@fortawesome/free-brands-svg-icons";

const Teams = () => {
  const team = [
    {
      id: 1,
      img: ceoImg,
      name: "Adeel Shahid",
      designation: "CEO, Co-Founder, Team Lead",
      experties:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, voluptates ipsam odio quasi animi repellendus dolore exercitationem veniam saepe nobis doloremque eos, tempora provident eligendi praesentium, ducimus mollitia sequi velit.",
    },
    {
      id: 2,
      img: jackass,
      name: "Zeeshan Aziz",
      designation: "CEO, Co-Founder, Bussines Manager",
      experties:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, voluptates ipsam odio quasi animi repellendus dolore exercitationem veniam saepe nobis doloremque eos, tempora provident eligendi praesentium, ducimus mollitia sequi velit.",
    },
    {
      id: 3,
      img: fucker,
      name: "Ali Shahid",
      designation: "App Developer",
      experties:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, voluptates ipsam odio quasi animi repellendus dolore exercitationem veniam saepe nobis doloremque eos, tempora provident eligendi praesentium, ducimus mollitia sequi velit.",
    },
    {
      id: 4,
      img: choondi,
      name: "Talha Tariq",
      designation: "App Developer",
      experties:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, voluptates ipsam odio quasi animi repellendus dolore exercitationem veniam saepe nobis doloremque eos, tempora provident eligendi praesentium, ducimus mollitia sequi velit.",
    },
    {
      id: 5,
      img: HotHoney,
      name: "Amir Shahzad",
      designation: "Web Developer",
      experties:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, voluptates ipsam odio quasi animi repellendus dolore exercitationem veniam saepe nobis doloremque eos, tempora provident eligendi praesentium, ducimus mollitia sequi velit.",
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
        <Button className="teams-start-btn">Join Our Team!</Button>
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
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="social-icon-fb"
                      />
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="social-icon-inst"
                      />
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="social-icon-tw"
                      />
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
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="social-icon-inst"
                      />
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="social-icon-tw"
                      />
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
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="social-icon-inst"
                    />
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="social-icon-tw"
                    />
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
