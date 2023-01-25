import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { query } from "../../data/fetchAllData";
import { Wrapper } from "../../assets/style/footerStyle";

const Footer = () => {
  const [fet, setFet] = useState([]);

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
        <p>Tous droits réservés</p>
      </Wrapper>
    </>
  );
};

export default Footer;
