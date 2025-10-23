import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services does Exofters provide?",
      answer: "We offer comprehensive digital solutions including mobile app development, web development, cloud solutions, e-commerce platforms, backend systems, and UI/UX design services."
    },
    {
      question: "How long does it take to develop a mobile app?",
      answer: "Development time varies based on complexity. A simple app takes 2-3 months, while complex applications may require 4-6 months or more. We provide detailed timelines during project planning."
    },
    {
      question: "Do you provide post-launch support?",
      answer: "Yes, we offer comprehensive post-launch support including bug fixes, updates, maintenance, and feature enhancements to ensure your application runs smoothly."
    },
    {
      question: "What technologies do you work with?",
      answer: "We work with modern technologies including React, Angular, Node.js, Flutter, React Native, AWS, Firebase, MongoDB, and more. We choose the best tech stack for each project."
    },
    {
      question: "How do you ensure project quality?",
      answer: "We follow industry best practices including code reviews, automated testing, continuous integration, and regular client feedback loops to ensure the highest quality deliverables."
    },
    {
      question: "What is your pricing model?",
      answer: "We offer flexible pricing models including fixed-price projects, time & material, and dedicated team arrangements. Contact us for a customized quote based on your requirements."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="section-header">
        <div className="subtitle">FAQ</div>
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about our services and process</p>
      </div>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <FontAwesomeIcon icon={activeIndex === index ? faMinus : faPlus} />
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
