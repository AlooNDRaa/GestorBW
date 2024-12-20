import React from "react";
import logo from "../../../img/color-bw-03.svg";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import DropdownMenu from "../functions/DropdorwnMenu";
import LogOut from "../functions/LogOut";

function Header({ setIsAuthenticated }) {
  return (
    <Navbar expand="lg" className="nav-cont">
      <Container>
        <a href="/home" className="headerLink">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-home">
            <ul className="ul-nav">
              <li className="li-nav">
                <Link to="/home">Home</Link>
              </li>
              <li className="li-nav">
                <Link to="/Tasks-and-habits">Tasks and habits</Link>
              </li>
              <li className="li-nav">
                <Link to="/mangamentEstress">Estress</Link>
              </li>
              <li className="li-nav">
                <Link to="/transactions">Transactions</Link>
              </li>
              <li className="li-nav">
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
            <DropdownMenu />
              <li className="li-nav">
                <LogOut setIsAuthenticated={setIsAuthenticated} />
              </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
