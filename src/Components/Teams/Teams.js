import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faLightbulb, faHandshake, faRocket } from "@fortawesome/free-solid-svg-icons";
import ceo1 from "../../Images/ceo1.jpg";
import "./Teams.css";

const Teams = () => {
  const founder = {
    name: "Adeel Shahid",
    role: "CEO & Founder",
    img: ceo1,
    bio: "Visionary leader with 8+ years of experience in software development and business strategy. Passionate about building innovative solutions that transform businesses.",
    social: { linkedin: "https://www.linkedin.com/in/adeelshhid/", github: "https://github.com/adeelshhid", facebook: "https://www.facebook.com/adeel.shhid/" }
  };

  const team = [
    
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

      <div className="founder-section">
        <div className="section-header">
          <div className="subtitle">Leadership</div>
          <h2>CEO & Founder</h2>
        </div>
        <div className="founder-card">
          <div className="founder-image">
            <img src={founder.img} alt={founder.name} />
          </div>
          <div className="founder-info">
            <h3>{founder.name}</h3>
            <div className="role">{founder.role}</div>
            <p>{founder.bio}</p>
            <div className="social-links">
              <a href={founder.social.linkedin} target="_blank" className="social-link">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href={founder.social.github} target="_blank"  className="social-link">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href={founder.social.facebook} target="_blank"  className="social-link">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {team.length > 0 && (
        <div className="teams-content">
          <div className="section-header">
            <div className="subtitle">Our Team</div>
            <h2>Meet The Team</h2>
          </div>
          <div className="teams-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.img} alt={member.name} />
                  <div className="team-overlay">
                    <div className="social-links">
                      <a href={member.social.linkedin} target="_blank" className="social-link">
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                      <a href={member.social.github}  target="_blank" className="social-link">
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                      <a href={member.social.facebook} target="_blank" className="social-link">
                        <FontAwesomeIcon icon={faFacebook} />
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
      )}

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
