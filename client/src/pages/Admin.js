import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { query } from "../data/fetchAllData";
import editBtn from "../assets/images/edit_btn.png";
import adminHoursPost from "../data/adminHoursPost";
import { carteQuery } from "../data/fetchCarteData";

const Admin = () => {
  const [fet, setFet] = useState([]);
  const [carteData, setCarteData] = useState();
  const [entree, setEntree] = useState();
  const [plat, setPlat] = useState();
  const [dessert, setDessert] = useState();
  const [menu, setMenu] = useState();
  const [hoursEdit, setHoursEdit] = useState(false);

  useEffect(() => {
    query().then((data) => setFet(data.heures));
    carteQuery().then((data) => {
      setCarteData(data);
      setEntree(data.entree);
      setPlat(data.plat);
      setDessert(data.dessert);
      setMenu(data.menu);
    });
  }, []);

  function editingHours(event, text, day, time) {
    let element = document.createElement("input");
    element.classList.add(time);
    element.setAttribute("id", day);
    element.value = text;
    event.target.parentNode.replaceChild(element, event.target);
  }

  function submitEdition(elem) {
    let data = [];
    elem.forEach((element) => {
      let day = element.getAttribute("id");
      let time = element.getAttribute("class");
      data.push({ day: day, time: time, target: element.value });
    });
    adminHoursPost(data);
    window.location.reload();
  }
  return (
    <Wrapper>
      <ImgWrapper>
        <h1>Galerie d'images</h1>
      </ImgWrapper>
      <HoursContainer>
        <h1>Horaires d'ouvertures</h1>
        <p>(Cliquez sur les horaires pour les éditer)</p>
        <table>
          <thead>
            <tr>
              <td>jour</td>
              <td>midi</td>
              <td>soir</td>
            </tr>
            <tr>
              <td></td>
              <td>ouverture-fermeture</td>
              <td>ouverture-fermeture</td>
            </tr>
          </thead>
          <tbody>
            {fet.map((elem, id) => {
              return (
                <tr key={id}>
                  <>
                    <td>{elem.day}</td>
                    <td
                      onClick={(e) => {
                        editingHours(
                          e,
                          e.target.textContent,
                          elem.day,
                          "lunch"
                        );
                        setHoursEdit(true);
                      }}
                    >
                      {elem.lunch}
                    </td>
                    <td
                      onClick={(e) => {
                        editingHours(
                          e,
                          e.target.textContent,
                          elem.day,
                          "dinner"
                        );
                        setHoursEdit(true);
                      }}
                    >
                      {elem.dinner}
                    </td>
                  </>
                </tr>
              );
            })}
          </tbody>
        </table>
        {hoursEdit ? (
          <div className="ctaEdit">
            <p>Édition finit</p>
            <button
              onClick={() =>
                submitEdition(
                  document.querySelectorAll("article table tbody input")
                )
              }
            >
              <img src={editBtn} alt="édition" />
            </button>
          </div>
        ) : null}
      </HoursContainer>
      <CarteContainer>
        <h1>Carte du restaurant</h1>
        <h2>Entrées</h2>
        <div className="content">
          {entree ? (
            <>
              <div className="seul">
                <h2>Seul</h2>
                {entree.map((food, id) => {
                  return !food.partage ? (
                    <div key={id}>
                      <h3>{food.nom}</h3>
                      <p>{food.description}</p>
                      <p>{food.prix}€</p>
                    </div>
                  ) : null;
                })}
              </div>
              <div className="partage">
                <h2>Partager</h2>
                {entree.map((food, id) => {
                  return food.partage ? (
                    <div key={id}>
                      <h3>{food.nom}</h3>
                      <p>{food.description}</p>
                      <p>{food.prix}€</p>
                    </div>
                  ) : null;
                })}
              </div>
            </>
          ) : null}
        </div>
        <h2>Plats</h2>
        <div className="content">
          {plat ? (
            <>
              <div className="seul">
                <h2>Seul</h2>
                {plat.map((food, id) => {
                  return !food.partage ? (
                    <div key={id}>
                      <h3>{food.nom}</h3>
                      <p>{food.description}</p>
                      <p>{food.prix}€</p>
                    </div>
                  ) : null;
                })}
              </div>
              <div className="partage">
                <h2>Partager</h2>
                {plat.map((food, id) => {
                  return food.partage ? (
                    <div key={id}>
                      <h3>{food.nom}</h3>
                      <p>{food.description}</p>
                      <p>{food.prix}€</p>
                    </div>
                  ) : null;
                })}
              </div>
            </>
          ) : null}
        </div>
        <h2>Desserts</h2>
        <div className="content">
          {dessert ? (
            <div>
              {dessert.map((food, id) => {
                return (
                  <div key={id}>
                    <h3>{food.nom}</h3>
                    <p>{food.description}</p>
                    <p>{food.prix}€</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <h2>Menus</h2>
        <div className="content">
          {menu ? (
            <div>
              {menu.map((food, id) => {
                return (
                  <div key={id}>
                    <h3>{food.nom}</h3>
                    <p>{food.description}</p>
                    <p>{food.formule}€</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </CarteContainer>
    </Wrapper>
  );
};

const HoursContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  font-size: var(--font-size);

  & table {
    display: grid;
    border-collapse: separate;
    gap: 3vh;
    & thead {
      background-color: var(--darker-color);
      border-radius: 10px;
      color: #fff;
      tr {
        text-align: center;
        & td {
          padding: 1em 2em;
        }
      }
    }

    & tbody {
      display: grid;
      gap: 3vh;
      & tr {
        width: 100%;
        display: grid;
        grid-template-columns: 15% 1fr 1fr;
        align-items: center;
        text-align: center;

        & td:nth-child(n + 2):hover {
          cursor: pointer;
        }
      }
    }
  }

  .ctaEdit {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    & button {
      display: grid;
      place-items: center;
      padding: 0.5em;
      border-radius: 50%;
    }
  }
`;
const ImgWrapper = styled.article``;
const CarteContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  font-size: var(--font-size);
  text-align: center;

  & h2 {
    font-size: var(--font-size-bigger);
  }

  width: 100%;
  & .content {
    display: flex;
    gap: 50px;

    & > div > div {
      height: 100px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 1em;

      & h3 {
        grid-area: 1 / 1 / 2 / 2;
      }
      & p:nth-child(2) {
        grid-area: 2 / 1 / 3 / 2;
        color: var(--darker-color);
      }
      & p:nth-child(3) {
        grid-area: 1 / 2 / 3 / 3;
      }
    }
  }
`;

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: clamp(20px, 20vh, 200px);
  padding-block: 150px;

  & h1 {
    font-size: var(--font-size-h1);
  }
`;
export default Admin;
