import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// force sjasdas isdvñs

const MakeUser = ({ setUserName }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate(); 

  const handleSaveName = () => {
    if (name.trim()) {
      setUserName(name);
      sessionStorage.setItem("userName", name); 
      
      navigate("/home");
    }
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="make-user-container">
      <div className="input-container">
        <h1>Bienvenido, ingresa tu nombre:</h1>
        <input
          type="text"
          value={name}
          required
          onChange={handleInputChange}
          placeholder="Tu nombre"
          className="name-input"
        />
        <button className="save-btn" onClick={handleSaveName}>
          Inicie
        </button>
      </div>
      <main className="flex"></main>
    </div>
  );
};

export default MakeUser;
