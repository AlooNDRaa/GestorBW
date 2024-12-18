import React from "react";
import logo from "../../../img/color-bw-03.svg";
import { Link } from "react-router-dom";
import DropdownMenu from "../functions/DropdorwnMenu";

function Navbar() {
  return (
    <nav className="nav-home">
      <header>
        <a href="/home" className="headerLink">
        <img src={logo} alt="Logo" className="logo" />
        </a>
      </header>
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
            <DropdownMenu/>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
