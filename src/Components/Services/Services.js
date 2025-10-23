import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile, faLaptopCode, faCloud, faShoppingCart, faDatabase, faPalette } from "@fortawesome/free-solid-svg-icons";
import "./Services.css";

const Services = () => {
  const services = [
    {
      icon: faMobile,
      title: "Mobile Development",
      desc: "Native and cross-platform mobile applications for iOS and Android",
      features: ["React Native", "Flutter", "iOS/Android Native", "App Store Deployment"]
    },
    {
      icon: faLaptopCode,
      title: "Web Development",
      desc: "Modern, responsive web applications built with cutting-edge technologies",
      features: ["React/Angular/Vue", "Node.js Backend", "Progressive Web Apps", "API Integration"]
    },
    {
      icon: faCloud,
      title: "Digital Transformation",
      desc: "Help businesses digitalize and modernize their operations",
      features: ["Process Automation", "Digital Strategy", "Legacy System Modernization", "Cloud Migration"]
    },
    {
      icon: faShoppingCart,
      title: "E-Commerce",
      desc: "Complete e-commerce solutions with payment integration",
      features: ["Custom Platforms", "Payment Gateways", "Inventory Management", "Analytics Dashboard"]
    },
    {
      icon: faDatabase,
      title: "Product Development",
      desc: "Innovative SaaS products to revolutionize industries",
      features: ["The Labour Platform", "VSM (Virtual Store Manager)", "BNPL Flight Booking", "Custom Products"]
    },
    {
      icon: faPalette,
      title: "UI/UX Design",
      desc: "Beautiful, intuitive designs that users love",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    }
  ];

  return (
    <div className="services-page page-transition">
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>Comprehensive digital solutions tailored to your business needs</p>
      </div>

      <div className="services-content">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Start Your Project?</h2>
        <p>Let's discuss how we can help bring your ideas to life with our expert team</p>
        <Link to="/contact" className="cta-btn">Get In Touch</Link>
      </div>
    </div>
  );
};

export default Services;
