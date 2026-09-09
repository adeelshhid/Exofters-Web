import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./VSM.css";

// Accessible, pixel-perfect inline SVG icons
const Icons = {
  Sparkles: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ArrowUpRight: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  Checkmark: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Box: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Users: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  TrendingUp: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Android: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 2.23 12.95 2 12 2c-.96 0-1.86.23-2.66.63L7.85 1.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 4.26 6 6.01 6 8h12c0-1.99-.97-3.75-2.47-4.84zM10 5.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75zm4 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z"/>
    </svg>
  ),
  Apple: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.65-.8 1.1-1.91.98-3.03-.98.04-2.18.66-2.88 1.48-.61.71-1.15 1.84-1.01 2.94 1.1.08 2.26-.58 2.91-1.39z"/>
    </svg>
  ),
  Globe: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  StoreLogo: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  BackArrow: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
};

const VSM = () => {
  const [activeBar, setActiveBar] = useState(6); // default to today
  const [chartTooltip, setChartTooltip] = useState({
    day: "Sun (Today)",
    value: "PKR 48,620",
    orders: "126 orders"
  });

  const chartData = [
    { day: "Mon", height: "35%", value: "PKR 22,400", orders: "58 orders" },
    { day: "Tue", height: "52%", value: "PKR 31,800", orders: "84 orders" },
    { day: "Wed", height: "42%", value: "PKR 26,150", orders: "69 orders" },
    { day: "Thu", height: "68%", value: "PKR 38,900", orders: "102 orders" },
    { day: "Fri", height: "57%", value: "PKR 34,200", orders: "91 orders" },
    { day: "Sat", height: "82%", value: "PKR 44,500", orders: "115 orders" },
    { day: "Sun", height: "94%", value: "PKR 48,620", orders: "126 orders" }
  ];

  const features = [
    {
      id: "stock",
      icon: <Icons.Box />,
      title: "Know your stock",
      description: "Track products, purchases, sales, expiry dates and stock movement in one clear workspace.",
      linkText: "Explore stock control"
    },
    {
      id: "customers",
      icon: <Icons.Users />,
      title: "Serve customers better",
      description: "Manage customer accounts, digital khata, supplier balances and payment history without the paperwork.",
      linkText: "Explore customer khata"
    },
    {
      id: "growth",
      icon: <Icons.TrendingUp />,
      title: "Grow with confidence",
      description: "Use simple reports and real-time business insights to make faster, better-informed decisions.",
      linkText: "Explore analytics"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create your store",
      description: "Set up your business in minutes with products, categories and essential details already organized."
    },
    {
      number: "02",
      title: "Run your day",
      description: "Record sales, purchases, customer payments and daily business expenses as they happen."
    },
    {
      number: "03",
      title: "Move forward",
      description: "See what is working, stay in control of your cash flow and keep your business growing."
    }
  ];

  const industries = [
    "Retail Stores",
    "Wholesale",
    "Pharmacy",
    "Agro-Vet",
    "Mobile & Electronics",
    "Everyday Trade"
  ];

  const platformLinks = {
    webAppUrl: "http://vet-store-77bd9.web.app/",
    androidAppUrl: "http://vet-store-77bd9.web.app/",
    iosAppUrl: null
  };

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "VSM – Virtual Store Manager | Point of Sale & Inventory by Exofters (Pvt) Ltd";

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Run your store with clarity and grow with confidence. VSM by Exofters (Pvt) Ltd brings your POS, inventory, sales, customer khata, and analytics into one simple platform."
      );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute("content", prevDesc);
      }
    };
  }, []);

  const scrollToSection = (sectionId, e) => {
    if (e) e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleBarHover = (index) => {
    setActiveBar(index);
    setChartTooltip(chartData[index]);
  };

  return (
    <main className="vsm-product-page page-transition">
      {/* Sub-header / Product Navigation Bar */}
      <nav className="vsm-subnav" aria-label="VSM product navigation">
        <div className="vsm-subnav-container">
          <div className="vsm-subnav-left">
            <Link to="/" className="vsm-back-link" title="Return to Exofters homepage">
              <Icons.BackArrow />
              <span>Back to Exofters</span>
            </Link>
            <div className="vsm-nav-divider" aria-hidden="true"></div>
            <div className="vsm-brand-pill">
              <span className="vsm-brand-icon">
                <Icons.StoreLogo />
              </span>
              <div className="vsm-brand-text">
                <strong>VSM</strong>
                <small>Virtual Store Manager</small>
              </div>
            </div>
          </div>

          <div className="vsm-subnav-links">
            <a href="#features" onClick={(e) => scrollToSection("features", e)}>
              Features
            </a>
            <a href="#how-it-works" onClick={(e) => scrollToSection("how-it-works", e)}>
              How it works
            </a>
            <a href="#apps" onClick={(e) => scrollToSection("apps", e)}>
              Apps
            </a>
            <a
              className="vsm-subnav-cta"
              href={platformLinks.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Open Web App</span>
              <Icons.ArrowUpRight />
            </a>
          </div>
        </div>
      </nav>

      <div className="landing-shell">
        {/* Hero Section */}
        <section className="hero-section" aria-label="Product introduction">
          <div className="hero-copy">
            <span className="eyebrow">
              <Icons.Sparkles />
              <span>Built for businesses that are going places</span>
            </span>

            <h1>
              Run your store with clarity. <em>Grow with confidence.</em>
            </h1>

            <p className="hero-lead">
              VSM brings your stock, sales, customers, suppliers and business performance together in one simple, powerful platform by <strong>Exofters (Pvt) Ltd</strong>.
            </p>

            <div className="hero-actions">
              <a
                className="primary-button"
                href={platformLinks.webAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="vsm-hero-start-btn"
              >
                <span>Start on the web</span>
                <Icons.ArrowRight />
              </a>
              <a
                className="text-button"
                href="#apps"
                onClick={(e) => scrollToSection("apps", e)}
              >
                <span>Explore apps</span>
                <Icons.ChevronDown />
              </a>
            </div>

            <div className="hero-note">
              <span className="hero-note-icon">
                <Icons.ShieldCheck />
              </span>
              <span>Simple to start · Ready for everyday business · Cloud synchronized</span>
            </div>
          </div>

          {/* Hero Visual Preview Component (Pure CSS) */}
          <div className="hero-visual" aria-label="VSM business dashboard preview">
            <div className="visual-glow" aria-hidden="true"></div>

            {/* Main Tilted Dashboard Card */}
            <div className="dashboard-card main-card">
              <div className="dashboard-topline">
                <div className="live-indicator">
                  <span className="live-dot" aria-hidden="true"></span>
                  <span>Business overview</span>
                </div>
                <div className="topline-controls" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div className="dashboard-title-row">
                <div>
                  <small>Good morning</small>
                  <strong>Your store at a glance</strong>
                </div>
                <span className="date-pill">Today</span>
              </div>

              <div className="stat-grid">
                <div className="stat-box">
                  <span>Sales</span>
                  <strong>PKR 48.6k</strong>
                  <small className="positive">↗ 18.4%</small>
                </div>
                <div className="stat-box">
                  <span>Orders</span>
                  <strong>126</strong>
                  <small className="positive">↗ 12.8%</small>
                </div>
                <div className="stat-box">
                  <span>Low stock</span>
                  <strong>08</strong>
                  <small className="warning">Needs attention</small>
                </div>
              </div>

              {/* 7-Day Sales Activity Bar Chart */}
              <div className="chart-area">
                <div className="chart-label">
                  <div>
                    <span>Sales activity</span>
                    <small>Last 7 days</small>
                  </div>
                  <div className="chart-hover-stat">
                    <strong>{chartTooltip.value}</strong>
                    <small>({chartTooltip.day})</small>
                  </div>
                </div>

                <div className="chart-bars" role="img" aria-label="7-day sales activity bar chart">
                  {chartData.map((bar, index) => (
                    <div
                      key={bar.day}
                      className={`chart-bar-wrapper ${activeBar === index ? "active-bar" : ""}`}
                      onMouseEnter={() => handleBarHover(index)}
                    >
                      <div
                        className="chart-bar-fill"
                        style={{ height: bar.height }}
                        title={`${bar.day}: ${bar.value} (${bar.orders})`}
                      ></div>
                      <span className="chart-bar-day">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Status Cards */}
            <div className="floating-card inventory-card">
              <span className="floating-icon green">
                <Icons.Checkmark />
              </span>
              <div>
                <small>Inventory status</small>
                <strong>Everything in control</strong>
              </div>
            </div>

            <div className="floating-card customers-card">
              <span className="floating-icon purple">
                <Icons.Users />
              </span>
              <div>
                <small>Customers served</small>
                <strong>1,284 this month</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Target Industries Trust Strip */}
        <section className="trust-strip" aria-label="Industries served by VSM">
          <span className="trust-title">One platform for your whole business</span>
          <div className="trust-tags">
            {industries.map((ind, idx) => (
              <span key={idx} className="trust-pill">
                <strong>{ind}</strong>
              </span>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section-block" aria-labelledby="features-heading">
          <div className="section-heading">
            <span className="eyebrow">
              <Icons.Sparkles />
              <span>Everything connected</span>
            </span>
            <h2 id="features-heading">The calm, capable way to manage business.</h2>
            <p>
              Less time searching through notebooks or disorganized spreadsheets. More time serving customers and building what comes next.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.id} className="feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a
                  href={platformLinks.webAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feature-link"
                >
                  <span>{feature.linkText}</span>
                  <Icons.ArrowRight />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Process Section / How it works */}
        <section id="how-it-works" className="process-section" aria-labelledby="how-it-works-heading">
          <div className="section-heading">
            <span className="eyebrow">
              <Icons.Sparkles />
              <span>A better business day</span>
            </span>
            <h2 id="how-it-works-heading">From first sale to lasting growth.</h2>
            <p>
              VSM is engineered to get your business up and running immediately without complicated technical training.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.number} className="step">
                <div className="step-badge">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Multi-Platform Download / Apps Section */}
        <section id="apps" className="apps-section" aria-labelledby="apps-heading">
          <div className="apps-copy">
            <span className="eyebrow">
              <Icons.Sparkles />
              <span>Take VSM with you</span>
            </span>
            <h2 id="apps-heading">Your business, wherever the day takes you.</h2>
            <p>
              Use VSM from any web browser or choose the mobile experience that fits your store's workflow. Everything stays in real-time cloud sync.
            </p>
            <a
              className="primary-button"
              href={platformLinks.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Open web app</span>
              <Icons.ArrowRight />
            </a>
          </div>

          <div className="download-cards">
            {/* Android / Aptoide Card */}
            <a
              className="download-card"
              href={platformLinks.androidAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Download VSM for Android on Aptoide"
            >
              <span className="store-icon android">
                <Icons.Android />
              </span>
              <span className="card-labels">
                <small>Get it on</small>
                <strong>Aptoide Store / Android</strong>
              </span>
              <span className="card-action-icon">
                <Icons.ArrowUpRight />
              </span>
            </a>

            {/* iOS App Store Card */}
            <div
              className="download-card disabled-card"
              title="VSM iOS App is currently in final App Store review"
            >
              <span className="store-icon apple">
                <Icons.Apple />
              </span>
              <span className="card-labels">
                <small>Coming Soon to</small>
                <strong>Apple App Store</strong>
              </span>
              <span className="card-badge">Reviewing</span>
            </div>

            {/* Web App Card */}
            <a
              className="download-card"
              href={platformLinks.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Launch the VSM Web Application"
            >
              <span className="store-icon web">
                <Icons.Globe />
              </span>
              <span className="card-labels">
                <small>Launch anywhere</small>
                <strong>VSM Cloud Web App</strong>
              </span>
              <span className="card-action-icon">
                <Icons.ArrowUpRight />
              </span>
            </a>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="final-cta" aria-label="Ready to start">
          <div className="cta-content">
            <span className="eyebrow light">
              <Icons.Sparkles />
              <span>Your next chapter starts here</span>
            </span>
            <h2>Make every business decision count with VSM.</h2>
            <p>Empower your staff, simplify your books, and take charge of inventory today.</p>
          </div>
          <div className="cta-action">
            <a
              className="primary-button light-button"
              href={platformLinks.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Get started with VSM</span>
              <Icons.ArrowRight />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default VSM;
