import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./assets/components/HomeScreen";
import RegisterScreen from "./assets/components/RegisterScreen";
import HomeS from "./assets/components/home";
import Transacciones from "./assets/components/Transacciones";
import TareasHabitos from "./assets/components/TareasHabitos";
import Navbar from "./assets/components/generals/header";
import Footer from "./assets/components/generals/footer";
import "./App.css";

function App() {
  const [userName, setUserName] = useState(""); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
      setIsAuthenticated(true);  
    }
  }, []);

  const WIP_MESSAGE = "Página aún en construcción...";
  const ERROR_MESSAGE = "¡UPS! Esa página no existe...";

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <RegisterScreen setUserName={setUserName} setIsAuthenticated={setIsAuthenticated} />}
        />
        
        <Route 
          path="/home"
          element={isAuthenticated ? <HomeScreen user={{ name: userName }} /> : <Navigate to="/" />}
        />
        
        <Route 
          path="/transactions"
          element={isAuthenticated ? <Transacciones /> : <Navigate to="/" />}
        />
        <Route 
          path="/tareasYhabitos"
          element={isAuthenticated ? <TareasHabitos /> : <Navigate to="/" />}
        />
        
        <Route 
          path="/dashboard"
          element={isAuthenticated ? <HomeS /> : <Navigate to="/" />}
        />
        
        <Route path="*" element={<h2>{ERROR_MESSAGE}</h2>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
