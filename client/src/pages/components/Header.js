import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/images/icon.svg";
import Log from "../components/Log";
import { Wrapper } from "../../assets/style/headerStyle";
import { userData } from "../../data/Connect";
import ProfilComponent from "./ProfilComponent";

const Header = ({ isConnected, display }) => {
  const [logPage, setLogPage] = useState(false);
  const [profilPage, setProfilPage] = useState(false);
  const [togglePage, setTogglePage] = useState("");
  return display ? (
    <>
      {logPage ? (
        <Log displayPage={setLogPage} togglePage={togglePage} />
      ) : null}
      {profilPage ? <ProfilComponent displayProfil={setProfilPage} /> : null}
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
          {!isConnected ? (
            <>
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
            </>
          ) : (
            <button id="profil" onClick={() => setProfilPage(true)}>
              {userData.userName.charAt(0)}
            </button>
          )}
        </div>
      </Wrapper>
    </>
  ) : null;
};

export default Header;
