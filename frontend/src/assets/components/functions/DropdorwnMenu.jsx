import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { IoAccessibility } from "react-icons/io5";

function DropdownMenu() {
  const [isDarkmode, setIsDarkMode] = useState(false);
  const [isDislexiaMode, setIsDislexiaMode] = useState(false);
  const [accessibilityMode, setIsAccessibilityMode] = useState("");

  const daltonimsMode = ["Daltonims"];

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("dark-mode");
    const savedAccessibilityMode = localStorage.getItem("accessibility-mode");
    const savedDislexiaMode = localStorage.getItem("dislexia-mode");

    if (savedDarkMode === "enabled") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }

    if (savedAccessibilityMode) {
      setIsAccessibilityMode(savedAccessibilityMode);
      document.body.classList.add(savedAccessibilityMode);
    }

    if (savedDislexiaMode === "enabled") {
      setIsDislexiaMode(true);
      document.body.classList.add("body-dislexia");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkmode) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("dark-mode", "disabled");
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "enabled");
    }
    setIsDarkMode(!isDarkmode);
  };

  const toggleDislexia = () => {
    if (isDislexiaMode) {
      document.body.classList.remove("body-dislexia");
      localStorage.setItem("dislexia-mode", "disabled");
    } else {
      document.body.classList.add("body-dislexia");
      localStorage.setItem("dislexia-mode", "enabled");
    }
    setIsDislexiaMode(!isDislexiaMode);
  };

  const toggleDaltonimsMode = (mode) => {
    if (accessibilityMode === mode) {
      document.body.classList.remove(mode);
      localStorage.removeItem("accessibility-mode");
      setIsAccessibilityMode("");
    } else {
      document.body.classList.remove(...daltonimsMode);
      document.body.classList.add(mode);
      localStorage.setItem("accessibility-mode", mode);
      setIsAccessibilityMode(mode);
    }
  };

  return (
    <Dropdown>  
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <IoAccessibility size={15} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item className="menu-drop" onClick={toggleDarkMode}>
          {isDarkmode ? "Ligth mode" : "Dark mode"}
        </Dropdown.Item>
        <Dropdown.Item className="menu-drop" onClick={toggleDislexia}>
          {isDislexiaMode ? "Disable Dislexia" : "Enable Dislexia"}
        </Dropdown.Item>
        {daltonimsMode.map((mode) => (
          <Dropdown.Item className="menu-drop" key={mode} onClick={() => toggleDaltonimsMode(mode)}>
            {accessibilityMode === mode
              ? `Disable ${mode.replace("body-", "")}`
              : `Enable ${mode.replace("body-", "")}`}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;
