import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Image, Offcanvas } from "react-bootstrap";
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
            <Button>Home</Button>
            <Button>Home</Button>
            <Button>Home</Button>
            <Button>Home</Button>
            <Button>Home</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar;
