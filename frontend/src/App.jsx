import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MakeUser from "./assets/components/functions/MakeUser";
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

  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
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
          element={<MakeUser setUserName={setUserName} />} 
        />
        <Route
          path="/home"
          element={ <HomeScreen user={{ name: userName }} />} 
        />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/dashboard" element={<HomeS />} />
        <Route path="/transactions" element={<Transacciones />} />
        <Route path="/tareasYhabitos" element={<TareasHabitos />} />
        <Route path="*" element={<h2>{ERROR_MESSAGE}</h2>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
