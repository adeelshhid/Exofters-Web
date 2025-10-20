import React from "react";
import "./Portfolio.css";
import Images from "../../ImageExport";

const Portfolio = () => {
  const portfolio = [
    {
      id: 1,
      name: "eTraffic",
      img: Images.etraffic,
      desc: "Traffic management system for Ministry of Interior - Bahrain",
      tags: ["Mobile App", "Government", "React Native"]
    },
    {
      id: 2,
      name: "Feba",
      img: Images.feba,
      desc: "Non-denominational Gospel radio broadcasting platform",
      tags: ["Web Radio", "Streaming", "React"]
    },
    {
      id: 3,
      name: "Guest",
      img: Images.guest,
      desc: "Travel booking platform for flights, hotels, and services",
      tags: ["Travel", "Booking", "Flutter"]
    },
    {
      id: 4,
      name: "Ivory",
      img: Images.ivory,
      desc: "Fashion e-commerce platform for women's clothing",
      tags: ["E-commerce", "Fashion", "React"]
    },
    {
      id: 5,
      name: "iWish",
      img: Images.iwish,
      desc: "App for leaving messages to loved ones",
      tags: ["Social", "Mobile", "iOS/Android"]
    },
    {
      id: 6,
      name: "Owner's Info",
      img: Images.ownersinfo,
      desc: "Lost device tracking and recovery application",
      tags: ["Security", "Mobile", "GPS"]
    },
    {
      id: 7,
      name: "Pent House Chat",
      img: Images.penthouse,
      desc: "Secure internal team messaging solution",
      tags: ["Chat", "Enterprise", "Real-time"]
    },
    {
      id: 8,
      name: "Quraan Radio",
      img: Images.quranradio,
      desc: "24/7 Quran audio streaming with translations",
      tags: ["Radio", "Streaming", "Multi-language"]
    },
    {
      id: 9,
      name: "X-Liquidus",
      img: Images.xliquidus,
      desc: "Blockchain-based digital asset trading platform",
      tags: ["Blockchain", "Trading", "Crypto"]
    }
  ];

  return (
    <div className="portfolio-page page-transition">
      <div className="portfolio-hero">
        <h1>Our Portfolio</h1>
        <p>Explore our successful projects that have transformed businesses worldwide</p>
      </div>

      <div className="portfolio-content">
        <div className="portfolio-grid">
          {portfolio.map((project) => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-image">
                <img src={project.img} alt={project.name} />
                <div className="portfolio-overlay">
                  <button className="view-btn">View Details</button>
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{project.name}</h3>
                <p>{project.desc}</p>
                <div className="portfolio-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
