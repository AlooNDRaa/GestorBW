import React, { useState } from "react";
import { auth } from "../../credentials/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
    <div className="register-container">
      <h2>{isRegistering ? "Crear cuenta" : "Iniciar sesión"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
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
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Confirmar contraseña"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button type="submit" className="submit-btn">
          {isRegistering ? "Registrarse" : "Iniciar sesión"}
        </button>
      </form>
      <p className="toggle-text">
        {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
        <button onClick={toggleForm} className="toggle-btn">
          {isRegistering ? "Inicia sesión aquí" : "Regístrate aquí"}
        </button>
      </p>
      <footer>
        <p>
          Al usar ByteWise, aceptas los <a href="/terms">Términos de uso</a>,{" "}
          <a href="/privacy">Política de privacidad</a> y{" "}
          <a href="/precontractual">Términos precontractuales</a>.
        </p>
      </footer>
    </div>
  );
}

export default RegisterScreen;
