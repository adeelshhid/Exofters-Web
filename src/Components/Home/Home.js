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
import python from "../../Images/python.png";
import tensorflow from "../../Images/tensorflow.png";
import Images from "../../ImageExport";
import Testimonials from "../Testimonials/Testimonials";
import FAQ from "../FAQ/FAQ";
import Process from "../Process/Process";
import "./Home.css";

const Home = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = { x: -1000, y: -1000 };
    const particles = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.4,
      vy: (Math.random() - 0.5) * 1.4,
      radius: 3
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        particles.forEach((p2, j) => {
          if (i >= j) return;
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < p.radius * 2) {
            const angle = Math.atan2(dy, dx);
            const overlap = p.radius * 2 - dist;
            p.x -= Math.cos(angle) * overlap * 0.5;
            p.y -= Math.sin(angle) * overlap * 0.5;
            p2.x += Math.cos(angle) * overlap * 0.5;
            p2.y += Math.sin(angle) * overlap * 0.5;
          }
        });
      });

      const nearMouse = particles.filter(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        return Math.sqrt(dx * dx + dy * dy) < 200;
      });

      nearMouse.forEach((p, i) => {
        nearMouse.forEach((p2, j) => {
          if (i >= j) return;
          const dx = (p.x + p2.x) / 2 - mouse.x;
          const dy = (p.y + p2.y) / 2 - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const opacity = Math.max(0, (1 - dist / 200) * 0.5);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(30, 167, 141, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        });
      });

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(43, 196, 168, 0.15)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const services = [
    { icon: faMobile, title: "Mobile Development", desc: "Native and cross-platform apps for iOS and Android" },
    { icon: faLaptopCode, title: "Web Development", desc: "Modern, responsive web applications" },
    { icon: faCloud, title: "AI & Machine Learning", desc: "Intelligent solutions with AI/ML models and automation" },
    { icon: faShoppingCart, title: "Digital Transformation", desc: "Help businesses digitalize and modernize operations" },
    { icon: faDatabase, title: "Product Development", desc: "Innovative SaaS products like The Labour, VSM & BNPL solutions" },
    { icon: faPalette, title: "UI/UX Design", desc: "Beautiful, intuitive user experiences" }
  ];

  const technologies = [
    { name: "React", img: react },
    { name: "Node.js", img: nodejs },
    { name: "Angular", img: angular },
    { name: "Flutter", img: flutter },
    { name: "Python", img: python },
    { name: "TensorFlow", img: tensorflow },
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
      <section className="hero" ref={heroRef}>
        <canvas ref={canvasRef} className="particle-canvas"></canvas>
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
            <p>We help businesses digitalize and transform with cutting-edge solutions including AI/ML. From development to digital transformation, we're launching innovative products to revolutionize industries.</p>
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
            <p>We are a team of passionate developers, designers, and strategists committed to delivering world-class digital solutions and helping businesses digitalize. We're launching innovative products including The Labour, VSM (Virtual Store Manager), and a BNPL-based flight booking solution to revolutionize how businesses operate.</p>
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

      <Process />

      <Testimonials />

      <FAQ />

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
