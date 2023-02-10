import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/images/icon.svg";
import Log from "../components/Log";
import { Wrapper } from "../../assets/style/headerStyle";
import { userData } from "../../data/Connect";
import ProfilComponent from "./ProfilComponent";
import styled from "styled-components";
import hamburgerBtn from "../../assets/images/barre-de-menu.png";

const Header = ({ isConnected, display }) => {
  const [logPage, setLogPage] = useState(false);
  const [profilPage, setProfilPage] = useState(false);
  const [togglePage, setTogglePage] = useState("");
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);
  const [responsiveMenu, setResponsiveMenu] = useState(
    window.innerWidth <= 600 ? true : false
  );

  window.onresize = (e) => {
    setWindowsWidth(e.target.innerWidth);
    setResponsiveMenu(window.matchMedia("(width <= 600px)").matches);
  };

  const NavMenu = () => {
    return (
      <NavContent>
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
      </NavContent>
    );
  };

  const MobilMenu = () => {
    return (
      <>
        <BtnMenu />
        <NavMenu />
      </>
    );
  };

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
        {!responsiveMenu ? <NavMenu /> : null}
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
        {responsiveMenu ? <MobilMenu /> : null}
      </Wrapper>
    </>
  ) : null;
};

const BtnMenu = styled.span`
  width: 32px;
  height: 32px;
  background-image: url("${hamburgerBtn}");
  margin-inline: 1em;
`;

const NavContent = styled.nav`
  
  top: 0px;
  right: 0px;
  width: 100vw;
  height: 100vh;
  ul {
    flex-direction: column;
  }
`;

export default Header;
