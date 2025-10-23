import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import "./Testimonials.css";

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const testimonials = [
    {
      name: "Ahmed Al-Mansoori",
      role: "Director, Ministry of Interior - Bahrain",
      content: "Exofters delivered an exceptional traffic management system that exceeded our expectations. Their professionalism and technical expertise are outstanding.",
      rating: 5,
      company: "Government of Bahrain"
    },
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      content: "Working with Exofters was a game-changer for our business. They transformed our ideas into a beautiful, functional application that our users love.",
      rating: 5,
      company: "TechStart Inc"
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      content: "The team's attention to detail and commitment to quality is remarkable. They delivered on time and within budget while maintaining excellent communication.",
      rating: 5,
      company: "Digital Solutions Ltd"
    }
  ];

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setActive((prev) => (prev + 1) % testimonials.length);
    }
    if (touchEndX.current - touchStartX.current > 50) {
      setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <section className="testimonials-section">
      <div className="section-header">
        <div className="subtitle">Testimonials</div>
        <h2>What Our Clients Say</h2>
      </div>
      <div 
        className="testimonials-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="testimonial-card active">
          <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
          <div className="rating">
            {[...Array(testimonials[active].rating)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} />
            ))}
          </div>
          <p className="testimonial-content">{testimonials[active].content}</p>
          <div className="testimonial-author">
            <h4>{testimonials[active].name}</h4>
            <p>{testimonials[active].role}</p>
          </div>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === active ? "active" : ""}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
