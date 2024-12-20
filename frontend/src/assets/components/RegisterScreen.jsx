import React, { useState } from "react";
import { auth } from "../../credentials/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import DropdownMenu from "./functions/DropdorwnMenu";

function RegisterScreen({ setUserName, setIsAuthenticated }) {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState("");
  const [NickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
  });
  const [emailValid, setEmailValid] = useState(true);
  const [nickNameValid, setNickNameValid] = useState(true);

  const toggleForm = () => setIsRegistering((prev) => !prev);

  const validatePassword = (password) => {
    setPasswordValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailValid(emailPattern.test(email));
  };

  const validateNickName = (nickName) => {
    setNickNameValid(nickName.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !NickName) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (isRegistering) {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }

      if (!passwordValidations.length || !passwordValidations.uppercase || !passwordValidations.number) {
        setError("La contraseña debe cumplir con todos los requisitos.");
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
        setError("Error al registrar usuario: " + error.message);
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
        setError("Error al iniciar sesión: " + error.message);
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Por favor, ingrese su correo electrónico.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("Se ha enviado un enlace para restablecer su contraseña.");
    } catch (error) {
      setError("Error al enviar el enlace de restablecimiento: " + error.message);
    }
  };

  return (
    <div className="drop">
      <div className="menu-drop-regs">
        <DropdownMenu />
      </div>
      <div className="register-flex">
      <div className="register-container">
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
          />
          {!emailValid && (
            <p style={{ color: "red" }}>El correo debe tener el formato correcto (ejemplo@dominio.com).</p>
          )}
          <input
            type="text"
            placeholder="NickName"
            required
            value={NickName}
            onChange={(e) => {
              setNickName(e.target.value);
              validateNickName(e.target.value);
            }}
          />
          {!nickNameValid && (
            <p style={{ color: "red" }}>El nombre de usuario no puede estar vacío.</p>
          )}
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
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

          {isRegistering && (
            <div className="password-requirements">
              <p style={{ color: passwordValidations.length ? "green" : "white" }}>
                {passwordValidations.length ? "✔" : "✘"} Al menos 8 caracteres
              </p>
              <p style={{ color: passwordValidations.uppercase ? "green" : "white" }}>
                {passwordValidations.uppercase ? "✔" : "✘"} Al menos una letra mayúscula
              </p>
              <p style={{ color: passwordValidations.number ? "green" : "white" }}>
                {passwordValidations.number ? "✔" : "✘"} Al menos un número
              </p>
            </div>
          )}
          
          <button type="submit" className="submit-btn" disabled={!emailValid || !nickNameValid || !passwordValidations.length || !passwordValidations.uppercase || !passwordValidations.number}>
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        {!isRegistering && (
          <div className="password-reset">
            <button onClick={handlePasswordReset} className="text-primary bg-transparent mt-3">
              Restore password
            </button>
          </div>
        )}

        <p className="toggle-text">
          {isRegistering ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button onClick={toggleForm} className="text-primary bg-transparent">
            {isRegistering ? "Login here" : "Register here"}
          </button>
        </p>
        <p className="toggle-text">
          By using ByteWise, you agree to the <a href="/terms">Terms of use</a> and{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
