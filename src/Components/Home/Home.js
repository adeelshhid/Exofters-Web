import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile, faLaptopCode, faCloud, faShoppingCart, faDatabase, faPalette } from "@fortawesome/free-solid-svg-icons";
import aboutBg from "../../Images/about-bg.png";
import react from "../../Images/react.png";
import nodejs from "../../Images/nodejs.png";
import angular from "../../Images/angular.png";
import flutter from "../../Images/flutter.png";
import php from "../../Images/php.png";
import mongodb from "../../Images/mongodb.png";
import aws from "../../Images/aws.png";
import firebase from "../../Images/firebase.png";
import Images from "../../ImageExport";
import "./Home.css";

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      
      const glow = heroRef.current.querySelector('.hero::before');
      if (heroRef.current) {
        heroRef.current.style.setProperty('--mouse-x', `${x}%`);
        heroRef.current.style.setProperty('--mouse-y', `${y}%`);
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const services = [
    { icon: faMobile, title: "Mobile Development", desc: "Native and cross-platform apps for iOS and Android" },
    { icon: faLaptopCode, title: "Web Development", desc: "Modern, responsive web applications" },
    { icon: faCloud, title: "Cloud Solutions", desc: "Scalable cloud infrastructure and deployment" },
    { icon: faShoppingCart, title: "E-Commerce", desc: "Complete online store solutions" },
    { icon: faDatabase, title: "Backend Systems", desc: "Robust APIs and database architecture" },
    { icon: faPalette, title: "UI/UX Design", desc: "Beautiful, intuitive user experiences" }
  ];

  const technologies = [
    { name: "React", img: react },
    { name: "Node.js", img: nodejs },
    { name: "Angular", img: angular },
    { name: "Flutter", img: flutter },
    { name: "PHP", img: php },
    { name: "MongoDB", img: mongodb },
    { name: "AWS", img: aws },
    { name: "Firebase", img: firebase }
  ];

  const featuredProjects = [
    { name: "eTraffic", img: Images.etraffic, desc: "Traffic management system for Bahrain" },
    { name: "Guest App", img: Images.guest, desc: "Travel booking platform" },
    { name: "X-Liquidus", img: Images.xliquidus, desc: "Blockchain trading platform" }
  ];

  const phrases = ['Digital Future', 'Success Story', 'Dream Project', 'Next Innovation'];
  const [typedText, setTypedText] = React.useState('');
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setTypedText(currentPhrase.slice(0, typedText.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  return (
    <div className="page-transition">
      <section className="hero" ref={heroRef} style={{'--mouse-x': '50%', '--mouse-y': '50%'}}>
        <div className="grid-overlay"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="static-text">Build Your </span>
              <span className="highlight typing-text">
                &nbsp;{typedText}
              </span>
              <span className="static-text"> With Us</span>
            </h1>
            <p>We craft exceptional digital experiences that transform businesses and delight users worldwide.</p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn-primary">Get Started</Link>
              <Link to="/portfolio" className="btn-secondary">View Portfolio</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="services-preview">
        <div className="section-header">
          <div className="subtitle">What We Do</div>
          <h2>Our Services</h2>
          <p>Comprehensive digital solutions tailored to your business needs</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src={aboutBg} alt="About Exofters" />
          </div>
          <div className="about-content">
            <div className="subtitle">About Us</div>
            <h2>Transforming Ideas Into Reality</h2>
            <p>We are a team of passionate developers, designers, and strategists committed to delivering world-class digital solutions. With years of experience and a portfolio of successful projects, we help businesses thrive in the digital age.</p>
            <div className="stats">
              <div className="stat-item">
                <h3>150+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-preview">
        <div className="section-header">
          <div className="subtitle">Our Work</div>
          <h2>Featured Projects</h2>
          <p>Explore some of our successful projects that have made an impact</p>
        </div>
        <div className="portfolio-grid">
          {featuredProjects.map((project, index) => (
            <div key={index} className="portfolio-card">
              <div className="portfolio-image">
                <img src={project.img} alt={project.name} />
              </div>
              <div className="portfolio-info">
                <h3>{project.name}</h3>
                <p>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/portfolio" className="view-all-btn">View All Projects</Link>
      </section>

      <section className="tech-section">
        <div className="section-header">
          <div className="subtitle">Technologies</div>
          <h2>Our Tech Stack</h2>
          <p>We work with cutting-edge technologies to build future-proof solutions</p>
        </div>
        <div className="tech-grid">
          {technologies.map((tech, index) => (
            <div key={index} className="tech-card">
              <img src={tech.img} alt={tech.name} />
              <h4>{tech.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Your Project?</h2>
        <p>Let's discuss how we can help bring your ideas to life with our expert team</p>
        <div className="cta-buttons">
          <Link to="/contact" className="btn-primary">Get In Touch</Link>
          <Link to="/services" className="btn-secondary">Our Services</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
