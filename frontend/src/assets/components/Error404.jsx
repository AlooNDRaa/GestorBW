import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaExclamationTriangle } from 'react-icons/fa'; 

export default function Error404() {
  return (
    <div className="error-container">
      <FaExclamationTriangle className="error-icon" />
      <h1 className="error-heading">404</h1>
      <p className="error-text">
        Oops... La página que buscas no está disponible. Tal vez fue movida, eliminada o el enlace es incorrecto.
      </p>
      <Link to="/" className="error-button">
        Volver al inicio
      </Link>
    </div>
  );
}
