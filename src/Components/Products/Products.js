import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faUsersGear,
  faPlaneDeparture,
  faCar,
  faArrowRight,
  faExternalLinkAlt,
  faCheck,
  faWandMagicSparkles
} from "@fortawesome/free-solid-svg-icons";
import "./Products.css";

const Products = () => {
  useEffect(() => {
    document.title = "Products – Software Platforms & SaaS by Exofters (Pvt) Ltd";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const products = [
    {
      id: "vsm",
      badge: "Flagship SaaS Platform",
      badgeColor: "primary",
      icon: faStore,
      name: "VSM – Virtual Store Manager",
      tagline: "Point of Sale, Inventory Control & Customer Digital Khata",
      description:
        "The calm, capable way to run modern retail, wholesale, pharmacy, and trade businesses. Track stock movement, automate low-stock alerts, manage digital khata without paperwork, and gain crystal-clear sales insights.",
      features: [
        "Cloud-based POS & rapid receipt generation",
        "Live stock tracking & expiry date surveillance",
        "Customer & supplier digital khata balances",
        "Available on Web & Android"
      ],
      primaryLink: "/products/vsm",
      primaryText: "Explore VSM Showcase",
      secondaryLink: "http://vet-store-77bd9.web.app/",
      secondaryText: "Launch Web App",
      isExternalSecondary: true,
      featured: true
    },
    {
      id: "the-labour",
      badge: "Workforce Platform",
      badgeColor: "blue",
      icon: faUsersGear,
      name: "The Labour Platform",
      tagline: "On-Demand Workforce Discovery & Attendance Ecosystem",
      description:
        "Connecting enterprises and contractors with verified skilled labor. Features automated work shift scheduling, real-time GPS-verified check-ins, skill rating, and automated wage disbursal.",
      features: [
        "Verified worker credentialing & identity checks",
        "Automated shift rosters & biometric attendance",
        "Direct digital payouts & contractor dashboards",
        "Built for construction, logistics & services"
      ],
      primaryLink: "/contact",
      primaryText: "Inquire About Platform",
      status: "Active Deployment",
      featured: false
    },
    {
      id: "bnpl",
      badge: "Fintech & Travel",
      badgeColor: "purple",
      icon: faPlaneDeparture,
      name: "BNPL Flight Booking Engine",
      tagline: "Buy Now Pay Later Solutions for Global Travel",
      description:
        "A financial technology engine enabling travelers to book flights and hotels with flexible split-payment plans, instant underwriting, and automated repayment tracking.",
      features: [
        "Sub-second credit approval & KYC verification",
        "Seamless integration with major airline GDS",
        "Flexible 3, 6, and 12-month installment schedules",
        "Secure PCI-DSS compliant checkout"
      ],
      primaryLink: "/contact",
      primaryText: "Partner With Us",
      status: "Upcoming Launch",
      featured: false
    },
    {
      id: "etraffic",
      badge: "GovTech / Enterprise",
      badgeColor: "green",
      icon: faCar,
      name: "eTraffic System",
      tagline: "High-Concurrency Mobile & Portal Infrastructure",
      description:
        "Mission-critical platform developed for the Ministry of Interior - Bahrain, providing citizens with rapid vehicle registration, driving licenses, and instant fine payments.",
      features: [
        "High-security government authentication",
        "500,000+ active citizen user base",
        "Automated digital vehicle documentation",
        "Zero-downtime microservices infrastructure"
      ],
      primaryLink: "/portfolio",
      primaryText: "View Case Study",
      status: "Live in Bahrain",
      featured: false
    }
  ];

  return (
    <div className="products-page page-transition">
      {/* Products Hero Section */}
      <section className="products-hero">
        <div className="hero-shape hero-shape-1" aria-hidden="true"></div>
        <div className="hero-shape hero-shape-2" aria-hidden="true"></div>
        <div className="products-hero-content">
          <span className="products-eyebrow">
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            <span>Exofters SaaS & Platforms</span>
          </span>
          <h1>Our Flagship Products</h1>
          <p>
            We engineer intelligent software platforms that transform everyday operations into competitive advantages. Explore our suite of scalable SaaS and enterprise platforms.
          </p>
        </div>
      </section>

      {/* Main Products Grid */}
      <div className="products-container">
        <div className="products-grid">
          {products.map((product) => (
            <article
              key={product.id}
              className={`product-card ${product.featured ? "featured-product-card" : ""}`}
            >
              <div className="product-card-header">
                <div className="product-icon-wrap">
                  <FontAwesomeIcon icon={product.icon} />
                </div>
                <div className="product-meta">
                  <span className={`product-badge ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                  {product.status && (
                    <span className="product-status-pill">{product.status}</span>
                  )}
                </div>
              </div>

              <div className="product-card-body">
                <h2>{product.name}</h2>
                <h3 className="product-tagline">{product.tagline}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-features-list">
                  <strong>Key Capabilities:</strong>
                  <ul>
                    {product.features.map((feat, idx) => (
                      <li key={idx}>
                        <span className="feat-check">
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="product-card-actions">
                <Link to={product.primaryLink} className="btn-product-primary">
                  <span>{product.primaryText}</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>

                {product.secondaryLink && (
                  <a
                    href={product.secondaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-product-secondary"
                  >
                    <span>{product.secondaryText}</span>
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <section className="products-cta-section">
        <div className="products-cta-content">
          <h2>Looking for a Tailored Product Solution?</h2>
          <p>
            Whether you need to scale an existing enterprise platform or turn a bold product concept into reality, our engineering team is ready to build it.
          </p>
          <div className="cta-actions">
            <Link to="/contact" className="btn-primary">
              Discuss Your Idea
            </Link>
            <Link to="/portfolio" className="btn-secondary">
              Explore Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
