import React from "react";
import logo from "../../../img/color-bw-03.svg";
import { Link } from "react-router-dom";
import { Navbar, Container, NavDropdown, Nav  } from "react-bootstrap";
import DropdownMenu from "../functions/DropdorwnMenu";


function Header() {
  return (
    <Navbar expand="lg" className="nav-cont">
      <Container>
       <a href="/home" className="headerLink">
        <img src={logo} alt="Logo" className="logo" />
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-home">
            <Nav.Link>
            <ul className="ul-nav">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/tareasYhabitos">Tareas y habitos</Link>
              </li>
              <li>
                <Link to="/transactions">Transacciones</Link>
              </li>
              <li>
              </li>
            </ul>
            </Nav.Link>
            <DropdownMenu/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
