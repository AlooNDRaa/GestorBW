import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import HomeScreen from "./assets/components/HomeScreen";
import RegisterScreen from "./assets/components/RegisterScreen";
import HomeS from "./assets/components/home";
import Transacciones from "./assets/components/Transacciones";
import TareasHabitos from "./assets/components/TareasHabitos";
import Footer from "./assets/components/generals/footer";
import "./App.css";
import Header from "./assets/components/generals/header";
import Dashboard from "./assets/components/Dashboard";

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

  return (
    <BrowserRouter>
      <AppContent
        userName={userName}
        setUserName={setUserName}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </BrowserRouter>
  );
}

function AppContent({
  userName,
  setUserName,
  isAuthenticated,
  setIsAuthenticated,
}) {
  const location = useLocation(); 

  const ERROR_MESSAGE = "¡UPS! Esa página no existe...";
  const isLoginScreen = location.pathname === "/";

  return (
    <div>
      {!isLoginScreen && <Header />}{" "}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <RegisterScreen
                setUserName={setUserName}
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          }
        />

        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <HomeScreen user={{ name: userName }} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/transactions"
          element={isAuthenticated ? <Transacciones /> : <Navigate to="/" />}
        />
        <Route
          path="/Tasks-and-habits"
          element={isAuthenticated ? <TareasHabitos /> : <Navigate to="/" />}
        />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route path="*" element={<h2>{ERROR_MESSAGE}</h2>} />
      </Routes>
      {!isLoginScreen && <Footer />}{" "}
    </div>
  );
}

export default App;
