import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import "./Testimonials.css";

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState('next');
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const testimonials = [
    { name: "Tomy Muszka", role: "Mobile App Client", content: "Everything was perfect", rating: 5, country: "Argentina", flag: "🇦🇷" },
    { name: "Alessio Corsi", role: "Software Engineer", content: "Exofters team is excellent, really knowledgeable and helpful.", rating: 5, country: "Italy", flag: "🇮🇹" },
    { name: "Ziyad Ruw", role: "Business Owner", content: "Very quick delivery from Exofters", rating: 5, country: "Saudi Arabia", flag: "🇸🇦" },
    { name: "Adam Elbaz", role: "App Developer", content: "Great and fast work", rating: 5, country: "Israel", flag: "🇮🇱" },
    { name: "Vibechurch", role: "Church Organization", content: "Wonderful work! Exofters helped get our push notifications squared away and working seamlessly! Very polite, knowledgeable, and professional.", rating: 5, country: "United States", flag: "🇺🇸" },
    { name: "Toothless Male", role: "App Owner", content: "Quick response times along with quick delivery times. Super polite and understanding, couldn't have made a better choice than to work with Exofters.", rating: 5, country: "United States", flag: "🇺🇸" },
    { name: "Iraouf", role: "Business Owner", content: "It was a pleasure to work with Exofters, professional and efficient, I highly recommend them", rating: 5, country: "France", flag: "🇫🇷" },
    { name: "Alanoud Abdul", role: "Entrepreneur", content: "Great, highly recommend. I wouldn't hesitate to work with Exofters again, they are real professionals!", rating: 5, country: "Saudi Arabia", flag: "🇸🇦" },
    { name: "Bouhejba Zied", role: "Developer", content: "I've had the pleasure of working with Exofters, and I must say, they are one of the most punctual and professional teams I've come across. I wouldn't hesitate to recommend them for any development project!", rating: 4, country: "Tunisia", flag: "🇹🇳" },
    { name: "Gavriel", role: "Entrepreneur", content: "Exofters is one of the best in the field. Smart, fast, patient, throughout the process they explain everything, understand every detail, and bring an even better result than I dreamed.", rating: 5, country: "Israel", flag: "🇮🇱" },
    { name: "Mbaliga Medsen", role: "Tech Client", content: "Simply the best", rating: 5, country: "United States", flag: "🇺🇸" },
    { name: "Tatiana Marrero", role: "Project Manager", content: "Exofters is exceptional! Their expertise and dedication shine through in every aspect. Creative problem-solving, seamless communication, and top-notch coding. A true asset to any project. Highly recommended!", rating: 5, country: "United States", flag: "🇺🇸" },
    { name: "Yaniv Ysmart", role: "Business Owner", content: "The team is professional!!!! Gave me a complete and quick answer. I will definitely work with Exofters again.", rating: 5, country: "Israel", flag: "🇮🇱" },
    { name: "Mr Tlha", role: "App Developer", content: "Exofters is so good at their skills. They really understand the requirements and delivered so fast. Highly recommended.", rating: 5, country: "Pakistan", flag: "🇵🇰" },
    { name: "Mo Ali", role: "Tech Entrepreneur", content: "One of the smartest, most creative full stack development teams I had the pleasure to work with.", rating: 5, country: "United Kingdom", flag: "🇬🇧" },
    { name: "Colm Coughlan", role: "Business Owner", content: "Brilliant to work with. Would highly recommend Exofters. Great communicators and very efficient.", rating: 5, country: "Ireland", flag: "🇮🇪" },
    { name: "Zenitha", role: "Developer", content: "Great solution and very fast delivery. Thank you Exofters!", rating: 5, country: "United States", flag: "🇺🇸" },
    { name: "Convect", role: "Tech Lead", content: "Communication and support from Exofters were very good during the whole process. The work was delivered as expected.", rating: 5, country: "Poland", flag: "🇵🇱" },
    { name: "Jayce Hame", role: "Startup Founder", content: "Great experience, Exofters helped us out with the issues we were facing, and kept working until we got the desired result.", rating: 5, country: "United States", flag: "🇺🇸" },
    { name: "Hassan Nawaz", role: "Developer", content: "Amazing work, Exofters knows their stuff when it comes to programming, they got the work done in no time, sooner than I ever expected.", rating: 5, country: "United Kingdom", flag: "🇬🇧" },
    { name: "Mi Pacifico", role: "App Owner", content: "Very quick and high quality work. Well done and thank you!", rating: 5, country: "United States", flag: "🇺🇸" },
    { name: "Paponice", role: "Business Owner", content: "Very satisfied, excellent service from Exofters, very good quality and speed. Thanks a lot.", rating: 5, country: "Dominican Republic", flag: "🇩🇴" },
    { name: "Andrei B.C.", role: "Tech Lead", content: "Exofters is so far the best team I found. Hard workers, great communication and super fast delivery.", rating: 5, country: "Moldova", flag: "🇲🇩" },
    { name: "Prabagar S", role: "Developer", content: "Excellent service from Exofters", rating: 5, country: "Canada", flag: "🇨🇦" },
    { name: "Sam Kingston", role: "Startup Founder", content: "When I was in a crisis situation, Exofters helped me out in no time and exceeded my expectations. I highly recommend them if you need help with code. Tremendously done!", rating: 5, country: "Norway", flag: "🇳🇴" },
    { name: "Nabil Rami", role: "Project Manager", content: "Exofters finished the project with quality work.", rating: 5, country: "United States", flag: "🇺🇸" },
    { name: "Carlos Sanchez", role: "Business Owner", content: "Kind team, worried about quality", rating: 5, country: "United States", flag: "🇺🇸" }
  ];

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setDirection('next');
        setActive((prev) => (prev + 1) % testimonials.length);
      } else {
        setDirection('prev');
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    touchEndX.current = e.clientX;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setDirection('next');
        setActive((prev) => (prev + 1) % testimonials.length);
      } else {
        setDirection('prev');
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const goToNext = () => {
    setDirection('next');
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setDirection('prev');
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="section-header">
        <div className="subtitle">Testimonials</div>
        <h2>What Our Clients Say</h2>
        <p>43+ Five-Star Reviews from clients across 20+ countries</p>
      </div>
      <div className="testimonials-wrapper">
        <div 
          ref={containerRef}
          className="testimonials-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {testimonials.map((testimonial, index) => {
            let className = 'testimonial-card';
            if (index === active) {
              className += ' active';
            } else if (index === (active - 1 + testimonials.length) % testimonials.length) {
              className += ' prev';
            } else if (index === (active + 1) % testimonials.length) {
              className += ' next';
            } else {
              className += ' hidden';
            }
            
            return (
            <div 
              key={index}
              className={className}
            >
              <div className="quote-wrapper">
                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
              </div>
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </div>
              <p className="testimonial-content">{testimonial.content}</p>
              <div className="testimonial-footer">
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                  <span className="company">{testimonial.flag} {testimonial.country}</span>
                </div>
              </div>
            </div>
            );
          })}
        </div>
        <div className="testimonial-navigation">
          <button 
            className="nav-btn prev-btn" 
            onClick={goToPrev}
          >
            ←
          </button>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === active ? "active" : ""}`}
                onClick={() => {
                  setDirection(index > active ? 'next' : 'prev');
                  setActive(index);
                }}
              />
            ))}
          </div>
          <button 
            className="nav-btn next-btn" 
            onClick={goToNext}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
