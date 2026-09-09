import React from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../content/ContentProvider";
import "./Services.css";

export default function Services() {
  const { services } = useContent();
  const liveServices = services.filter(
    (service) => service.published !== false,
  );
  return (
    <main className="services-page page-transition">
      <header className="services-hero">
        <span>CAPABILITIES</span>
        <h1>Designed to move business forward.</h1>
        <p>
          Senior thinking and deep product craft, from the first idea to the
          systems your teams depend on.
        </p>
      </header>
      <section className="services-content">
        <div className="services-grid">
          {liveServices.map((service, index) => (
            <article className="service-card" key={service.id}>
              <div className="service-icon">0{index + 1}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {(service.features || []).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="cta-section">
        <h2>Ready to build what’s next?</h2>
        <p>
          Bring your biggest operational challenge. We’ll bring sharp product
          thinking.
        </p>
        <Link to="/contact" className="cta-btn">
          Start a conversation →
        </Link>
      </section>
    </main>
  );
}
