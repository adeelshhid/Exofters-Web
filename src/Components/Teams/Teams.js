import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faLightbulb, faHandshake, faRocket } from "@fortawesome/free-solid-svg-icons";
import ceo1 from "../../Images/ceo1.jpg";
import ceo2 from "../../Images/ceo2.jpeg";
import "./Teams.css";

const Teams = () => {
  const team = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      img: ceo1,
      social: { linkedin: "#", github: "#", twitter: "#" }
    },
    {
      name: "Jane Smith",
      role: "CTO",
      img: ceo2,
      social: { linkedin: "#", github: "#", twitter: "#" }
    },
    {
      name: "Mike Johnson",
      role: "Lead Developer",
      img: ceo1,
      social: { linkedin: "#", github: "#", twitter: "#" }
    },
    {
      name: "Sarah Williams",
      role: "UI/UX Designer",
      img: ceo2,
      social: { linkedin: "#", github: "#", twitter: "#" }
    }
  ];

  const values = [
    { icon: faHeart, title: "Passion", desc: "We love what we do and it shows in our work" },
    { icon: faLightbulb, title: "Innovation", desc: "Always exploring new technologies and approaches" },
    { icon: faHandshake, title: "Integrity", desc: "Honest, transparent, and reliable in everything" },
    { icon: faRocket, title: "Excellence", desc: "Committed to delivering the highest quality" }
  ];

  return (
    <div className="teams-page page-transition">
      <div className="teams-hero">
        <h1>Meet Our Team</h1>
        <p>Talented individuals working together to create amazing digital experiences</p>
      </div>

      <div className="teams-content">
        <div className="teams-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-image">
                <img src={member.img} alt={member.name} />
                <div className="team-overlay">
                  <div className="social-links">
                    <a href={member.social.linkedin} className="social-link">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href={member.social.github} className="social-link">
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href={member.social.twitter} className="social-link">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <div className="role">{member.role}</div>
                <p>Passionate about creating innovative solutions and leading teams to success.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="values-section">
        <div className="values-header">
          <h2>Our Core Values</h2>
          <p>The principles that guide everything we do</p>
        </div>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">
                <FontAwesomeIcon icon={value.icon} />
              </div>
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
