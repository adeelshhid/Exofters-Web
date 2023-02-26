import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faBars,
  faBriefcase,
  faHouse,
  faPeopleGroup,
  faScrewdriverWrench,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Image, Offcanvas } from "react-bootstrap";
import companylogo from "../../Images/companylogo.png";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

function NavBar() {
  let [scrollHeight, setScrollHeight] = useState(0);

  window.addEventListener("scroll", () => {
    setScrollHeight(window.scrollY);
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [selectedIndex, setIndex] = useState(0);

  return (
    <>
      <Navbar
        expand="lg"
        className={
          scrollHeight <= 0 ? "nav-bar fixed-top" : "nav-dark nav-bar fixed-top"
        }
      >
        <Container className="nav-padding">
          <Navbar.Brand href="#home">
            <Image
              className={
                scrollHeight <= 0 ? "company-logo" : "company-logo-small"
              }
              src={companylogo}
              alt="Exofters"
            ></Image>
          </Navbar.Brand>
          <Nav className="d-sm-none d-md-flex d-lg-flex d-xl-flex nav-links">
            <Link to="/" className="links navlink-padding">
              Home
            </Link>
            <Link to="/portfolio" className="links navlink-padding">
              Portfolio
            </Link>
            <Link to="/teams" className="links navlink-padding">
              Teams
            </Link>
            <Link to="/" className="links navlink-padding">
              Services
            </Link>
            <Link to="/" className="links navlink-padding">
              Contact Us
            </Link>
          </Nav>
          <Navbar.Toggle
            className="hamburger-icon d-md-none d-lg-none d-xl-none"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </Navbar.Toggle>
        </Container>
      </Navbar>

      <Offcanvas className="offcanvas-nav" show={show} onHide={handleClose}>
        <Offcanvas.Header>
          <Offcanvas.Title>
            <Image
              className="canvas-logo"
              src={companylogo}
              alt="Exofters"
            ></Image>
          </Offcanvas.Title>
          <FontAwesomeIcon
            className="close-btn"
            icon={faXmark}
            onClick={handleClose}
          ></FontAwesomeIcon>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="canvas-links">
            <Button
              className={selectedIndex === 0 ? "selected-btn" : "canvas-btn"}
              onClick={() => setIndex(0)}
            >
              <FontAwesomeIcon
                icon={faHouse}
                className="pe-3"
              ></FontAwesomeIcon>
              Home
            </Button>
            <Button
              className={selectedIndex === 1 ? "selected-btn" : "canvas-btn"}
              onClick={() => setIndex(1)}
            >
              <FontAwesomeIcon
                icon={faBriefcase}
                className="pe-3"
              ></FontAwesomeIcon>
              Portfolio
            </Button>
            <Button
              className={selectedIndex === 2 ? "selected-btn" : "canvas-btn"}
              onClick={() => setIndex(2)}
            >
              <FontAwesomeIcon
                icon={faScrewdriverWrench}
                className="pe-3"
              ></FontAwesomeIcon>
              Services
            </Button>
            <Button
              className={selectedIndex === 3 ? "selected-btn" : "canvas-btn"}
              onClick={() => setIndex(3)}
            >
              <FontAwesomeIcon
                icon={faPeopleGroup}
                className="pe-3"
              ></FontAwesomeIcon>
              Team
            </Button>
            <Button
              className={selectedIndex === 4 ? "selected-btn" : "canvas-btn"}
              onClick={() => setIndex(4)}
            >
              <FontAwesomeIcon
                icon={faAddressBook}
                className="pe-3"
              ></FontAwesomeIcon>
              Contact Us
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar;
