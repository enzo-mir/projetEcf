import React, { Children, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/images/icon.svg";
import Log from "../components/Log";
import {
  Wrapper,
  HeaderContainer,
  BtnMenu,
} from "../../assets/style/headerStyle";
import { userData } from "../../data/Connect";
import ProfilComponent from "./ProfilComponent";
import styled from "styled-components";
import Reserv from "./Reserv";

const Header = ({ isConnected, display }) => {
  const [logPage, setLogPage] = useState(false);
  const [profilPage, setProfilPage] = useState(false);
  const [res, setRes] = useState(false);
  const [togglePage, setTogglePage] = useState("");
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);
  const [responsiveMenu, setResponsiveMenu] = useState(
    window.innerWidth <= 600 ? true : false
  );

  window.onresize = (e) => {
    setWindowsWidth(e.target.innerWidth);
    setResponsiveMenu(window.matchMedia("(width <= 600px)").matches);
  };

  document.onmouseup = (e) => {
    let obj = document.querySelector("header");
    let dropDownContent = obj.children[1];
    if (dropDownContent.classList.contains("display")) {
      if (!obj.contains(e.target)) {
        dropDownContent.classList.remove("display");
      }
    }
  };

  const NavMenu = () => {
    return (
      <HeaderContainer className={responsiveMenu ? "mobilHeader" : null}>
        <NavContent>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/carte">Carte</Link>
            </li>
            <li>
              <button className="btnReserve" onClick={() => setRes(true)}>
                Réserver
              </button>
            </li>
          </ul>
        </NavContent>
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
      </HeaderContainer>
    );
  };

  const MobilMenu = () => {
    return (
      <>
        <NavMenu />
        <BtnMenu
          onClick={(e) => {
            e.target.parentNode.children[1].classList.toggle("display");
            let elemLink = Object.values(
              e.target.parentNode.children[1].children
            );

            elemLink.map((el) => {
              Object.values(el.querySelectorAll("a")).map((a) => {
                a.onclick = () =>
                  document
                    .querySelector(".display")
                    .classList.remove("display");
              });
              Object.values(el.querySelectorAll("button")).map((button) => {
                button.onclick = () =>
                  document
                    .querySelector(".display")
                    .classList.remove("display");
              });
            });
          }}
        />
      </>
    );
  };

  return display ? (
    <>
      {logPage && <Log displayPage={setLogPage} togglePage={togglePage} />}
      {profilPage && <ProfilComponent displayProfil={setProfilPage} />}
      {res && <Reserv res={setRes} />}

      <Wrapper>
        <div className="imgContainer">
          <img src={icon} alt="Icon du site" />
        </div>
        {!responsiveMenu ? <NavMenu /> : <MobilMenu />}
      </Wrapper>
    </>
  ) : null;
};

const NavContent = styled.nav``;

export default Header;
