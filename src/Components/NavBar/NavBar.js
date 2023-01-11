import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image, Offcanvas } from "react-bootstrap";
import companylogo from "../../Images/companylogo.png";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.css";

function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar expand="lg">
        <Container className="nav-padding">
          <Navbar.Brand href="#home">
            <Image
              className="company-logo"
              src={companylogo}
              alt="Exofters"
            ></Image>
          </Navbar.Brand>
          <Nav className="d-sm-none d-lg-flex nav-links">
            <Nav.Link href="#home" className="navlink-padding">
              Home
            </Nav.Link>
            <Nav.Link href="#link" className="navlink-padding">
              Mobile
            </Nav.Link>
            <Nav.Link href="#link" className="navlink-padding">
              Web
            </Nav.Link>
            <Nav.Link href="#link" className="navlink-padding">
              Startups
            </Nav.Link>
            <Nav.Link href="#link" className="navlink-padding">
              Enterprise
            </Nav.Link>
            <Nav.Link href="#link" className="navlink-padding">
              Portfolio
            </Nav.Link>
            <Nav.Link href="#link" className="navlink-padding">
              Jobs
            </Nav.Link>
            <Nav.Link href="#link" className="navlink-padding">
              Contact Us
            </Nav.Link>
          </Nav>
          <Navbar.Toggle className="hamburger-icon" onClick={handleShow}>
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </Navbar.Toggle>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Exofters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar;
