import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Images from "../../ImageExport";
import "./NavBar.css";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/services", label: "Services" },
    { path: "/teams", label: "Team" }
  ];

  const isItemActive = (itemPath) => {
    if (itemPath === "/products") {
      return location.pathname.startsWith("/products") || location.pathname === "/vsm";
    }
    return location.pathname === itemPath;
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : "transparent"}`}>
        <div className="navbar-container">
          <Link to="/" className="logo-container">
            <img src={Images.companylogo} alt="Exofters" className="logo" />
            {/* <span className="logo-text">Exofters</span> */}
          </Link>
          <div className="nav-links">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isItemActive(item.path) ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="cta-button">Get Started</Link>
          </div>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation menu">
            <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${isItemActive(item.path) ? "active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
        <Link to="/contact" className="cta-button">Get Started</Link>
      </div>
    </>
  );
}

export default NavBar;
