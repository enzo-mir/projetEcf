import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import icon from "../../assets/images/icon.svg";
import Reserv from "./Reserv";

const Header = () => {
  return (
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
        <button>Inscription</button>
        <button>Connexion</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-color);
  backdrop-filter: blur(5px);
  z-index: 50;

  & .imgContainer {
    padding-inline: 1em;
  }

  & nav {
    width: max-content;

    & ul {
      display: flex;
      justify-content: center;
      column-gap: 3vw;
      & li {
        display: grid;
        place-items: center;
        font-size: var(--font-size);
        & a {
          color: var(--darker-color);
          text-decoration: none;
        }
      }
    }
  }

  & .profil {
    display: flex;
    justify-content: center;
    column-gap: 2vw;
    padding-inline: 1em;
  }
`;

export default Header;
