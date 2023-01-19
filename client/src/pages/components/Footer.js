import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { query } from "../../data/fetchAllData";

const Footer = () => {
  const [fet, setFet] = useState([]);

  function placeHours(lunch, dinner) {
    return lunch === "fermer"
      ? dinner === "fermer"
        ? "fermer"
        : `${dinner}`
      : dinner === "fermer"
      ? "fermer"
      : `${lunch} et ${dinner}`;
  }

  useEffect(() => {
    query().then((data) => setFet(data.heures));
  }, []);

  return (
    <>
      <Wrapper>
        <table id="horaires">
          <thead>
            <tr>
              <th>Horaires d'ouvertures</th>
            </tr>
          </thead>
          <tbody>
            {fet.map((elem) => {
              return (
                <>
                  <tr key={elem.id}>
                    <td>{elem.day}</td>
                    <td>{elem.lunch}</td>
                    <td>{elem.dinner}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <nav>
          <ul>
            <li>
              <Link>Accueil</Link>
            </li>
            <li>
              <Link>Carte</Link>
            </li>
            <li>
              <button className="btnReserve">Réserver</button>
            </li>
          </ul>
        </nav>
        <p>Tous droits réservés</p>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: var(--font-size);
  row-gap: 5vh;
  margin-top: 100px;

  & #horaires {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    row-gap: 5vh;
    width: 30%;

    & thead > tr > th {
      position: relative;
      font-size: var(--font-size-bigger);

      &::after,
      &::before {
        content: "";
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 5px;
        background-color: var(--darker-color);
      }

      &::after {
        top: -50%;
        width: 50%;
      }
      &::before {
        bottom: -50%;
        width: 70%;
      }
    }

    & tbody {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      row-gap: 3vh;
      width: 100%;

      & tr {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        place-items: center;
        width: 100%;
      }
    }
  }

  & nav {
    width: 30%;
    & ul {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      column-gap: 2.5vw;
      background-color: var(--primary-color);
      padding: 1em;
      & a {
        color: var(--darker-color);
        text-decoration: none;
      }
    }
  }
`;

export default Footer;
