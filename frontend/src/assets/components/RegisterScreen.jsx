import React, { useState } from "react";
import { auth } from "../../credentials/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import DropdownMenu from "./functions/DropdorwnMenu";

function RegisterScreen({ setUserName, setIsAuthenticated }) {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState("");
  const [NickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => setIsRegistering((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        sessionStorage.setItem("userName", NickName); 
        setUserName(NickName); 
        setIsAuthenticated(true); 
        console.log("Usuario registrado con éxito");
        window.location.href = "/home"; 
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        sessionStorage.setItem("userName", NickName);
        setUserName(NickName); 
        setIsAuthenticated(true); 
        console.log("Inicio de sesión exitoso");
        window.location.href = "/home";
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="drop">
      <div className="menu-drop-regs">
      <DropdownMenu/>
      </div>
    <div className="register-container">
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Adress"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="NickName"
          required
          value={NickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Confirm password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button type="submit" className="submit-btn">
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <p className="toggle-text">
        {isRegistering ? "Alredy have an account?" : "Don´t have an account?"}{" "}
        <button onClick={toggleForm} className="text-primary bg-transparent">
          {isRegistering ? "Login here" : "Register here"}
        </button>
      </p>
        <p className="toggle-text">
          By using ByteWise, you agree to the <a href="/terms">Terms of use</a> y {" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
    </div>
    </div>
  );
}

export default RegisterScreen;
