import React from "react";
import cards from "../json/Cards.Home.json"
import { Link } from "react-router-dom";

function HomeScreen({ user }) {
  return (
    <div className="container">
      <div className="home-container">
        <h1>Welcome {user.name || "Usuario"}, to ByteWise</h1>

        <div className="home-options">
          {
            cards.map((cards, index) => (
          <div className="option-card" key={index}>
            <h3>{cards.title}</h3>
            <p>{cards.description}</p>
            <Link to={cards.link} className="buton-cardshome btn-primary">
              {cards.buttonText}
            </Link>
          </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
