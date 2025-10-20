import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import "./Contact.css";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const validateForm = () => {
    const { name, email, message } = form;
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await emailjs.send(
        "service_y6cs34m",
        "template_7dat5g2",
        { email: form.email, name: form.name, message: form.message },
        "_6Td844_fKAwDRtj4"
      );
      setStatus({ type: "success", message: "Message sent successfully! We'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: faMapMarkerAlt, title: "Address", content: "257A G5, Phase 1, Wapda Town, Lahore" },
    { icon: faPhone, title: "Phone", content: "+92 (300) 7171787", link: "tel:+923007171787" },
    { icon: faEnvelope, title: "Email", content: "info@exofters.site", link: "mailto:info@exofters.site" },
    { icon: faGlobe, title: "Website", content: "www.exofters.site", link: "https://www.exofters.site" }
  ];

  return (
    <div className="contact-page page-transition">
      <div className="contact-hero">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you. Let's start a conversation about your project</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          {contactInfo.map((info, index) => (
            <div key={index} className="info-card">
              <div className="info-icon">
                <FontAwesomeIcon icon={info.icon} />
              </div>
              <h3>{info.title}</h3>
              {info.link ? (
                <p><a href={info.link}>{info.content}</a></p>
              ) : (
                <p>{info.content}</p>
              )}
            </div>
          ))}
        </div>

        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          {status.message && (
            <div className={status.type === "success" ? "success-message" : "error-message"}>
              {status.message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Your name"
              />
              {errors.name && <small style={{ color: "#991b1b" }}>{errors.name}</small>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="your@email.com"
              />
              {errors.email && <small style={{ color: "#991b1b" }}>{errors.email}</small>}
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                className="form-control"
                value={form.message}
                onChange={(e) => setField("message", e.target.value)}
                placeholder="Tell us about your project..."
              />
              {errors.message && <small style={{ color: "#991b1b" }}>{errors.message}</small>}
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
