import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/images/icon.svg";
import Log from "../components/Log";
import { Wrapper } from "../../assets/style/headerStyle";

const Header = () => {
  const [logPage, setLogPage] = useState(false);
  const [togglePage, setTogglePage] = useState("");
  return (
    <>
      {logPage ? (
        <Log displayPage={setLogPage} togglePage={togglePage} />
      ) : null}
      <Wrapper>
        <div className="imgContainer">
          <img src={icon} alt="Icon du site" />
        </div>
        <nav className="navBar">
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/carte">Carte</Link>
            </li>
            <li>
              <button className="btnReserve">Réserver</button>
            </li>
          </ul>
        </nav>
        <div className="profil">
          <button
            className="signIn"
            onClick={() => {
              setTogglePage("signin");
              setLogPage(true);
            }}
          >
            Inscription
          </button>
          <button
            className="logIn"
            onClick={() => {
              setLogPage(true);
              setTogglePage("login");
            }}
          >
            Connexion
          </button>
        </div>
      </Wrapper>
    </>
  );
};

export default Header;
