import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { query } from "../data/fetchAllData";
import editBtn from "../assets/images/edit_btn.png";
import adminHoursPost from "../data/adminHoursPost";
import { carteQuery } from "../data/fetchCarteData";
import { Overlay } from "../assets/style/overlay";
import postUpdateCarte from "../data/postUpdateCarte";

const Admin = () => {
  const [fet, setFet] = useState([]);
  const [carteData, setCarteData] = useState();
  const [entree, setEntree] = useState();
  const [plat, setPlat] = useState();
  const [dessert, setDessert] = useState();
  const [menu, setMenu] = useState();
  const [hoursEdit, setHoursEdit] = useState(false);
  const [displayEditCarte, setDisplayEditCarte] = useState(false);
  const [titleCarteEdition, setTitleCarteEdition] = useState("");
  const [descCarteEdition, setDescCarteEdition] = useState("");
  const [priceCarteEdition, setPriceCarteEdition] = useState("");
  const [errorEditingCarte, setErrorEditingCarte] = useState(false);

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

  const EditingCarteComponents = () => {
    function HandlerError({ error }) {
      return <p>{error}</p>;
    }
    return (
      <Overlay onClick={() => setDisplayEditCarte(false)}>
        <EditCarteContainer onClick={(e) => e.stopPropagation()}>
          <div>
            <h1>Édition de la carte</h1>
            {errorEditingCarte && <HandlerError error={errorEditingCarte} />}
          </div>
          <div>
            <p>titre : {titleCarteEdition}</p>
            {descCarteEdition ? (
              <>
                <p>description : {descCarteEdition}</p>
                <p>prix : {priceCarteEdition}</p>
              </>
            ) : (
              <p>formule : {priceCarteEdition}</p>
            )}
          </div>
          <div>
            <input type="text" />
            {descCarteEdition ? (
              <>
                <input type="text" />
                <input type="number" min="0" />
              </>
            ) : (
              <input type="text" />
            )}
          </div>
          <button
            onClick={(e) => {
              e.target.parentNode
                .querySelectorAll("input")
                .forEach((inputs) => {
                  inputs.value === ""
                    ? setErrorEditingCarte("erreur : champs non-remplis")
                    : setErrorEditingCarte(false);
                });

              if (!errorEditingCarte) {
                descCarteEdition
                  ? postUpdateCarte(
                      titleCarteEdition,
                      descCarteEdition,
                      e.target.parentNode.children[2].firstChild.value,
                      e.target.parentNode.children[2].children[1].value,
                      e.target.parentNode.children[2].children[2].value,
                      null
                    )
                  : postUpdateCarte(
                      titleCarteEdition,
                      descCarteEdition,
                      e.target.parentNode.children[2].firstChild.value,
                      null,
                      null,
                      e.target.parentNode.children[2].children[1].value
                    );
              }
            }}
          >
            Fin de l'édition
          </button>
        </EditCarteContainer>
      </Overlay>
    );
  };

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

  function editableCarte(event) {
    let title = event.target.parentNode.firstChild.textContent;
    let desc = event.target.parentNode.children[1].textContent;
    let price = event.target.parentNode.children[2].textContent;
    setTitleCarteEdition(title);
    setDescCarteEdition(desc);
    setPriceCarteEdition(price);
    setDisplayEditCarte(true);
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
        {displayEditCarte && <EditingCarteComponents />}
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
                      <button onClick={(e) => editableCarte(e)}>
                        <img src={editBtn} alt="edit btn" />
                      </button>
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
                      <button onClick={(e) => editableCarte(e)}>
                        <img src={editBtn} alt="edit btn" />
                      </button>
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
                      <button onClick={(e) => editableCarte(e)}>
                        <img src={editBtn} alt="edit btn" />
                      </button>
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
                      <button onClick={(e) => editableCarte(e)}>
                        <img src={editBtn} alt="edit btn" />
                      </button>
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
                  <div key={id} className="dessert">
                    <h3>{food.nom}</h3>
                    <p>{food.description}</p>
                    <p>{food.prix}€</p>
                    <button onClick={(e) => editableCarte(e)}>
                      <img src={editBtn} alt="edit btn" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        {menu ? (
          <>
            <h2>Menus</h2>
            <div className="content">
              <div>
                {menu.map((food, id) => {
                  return (
                    <div key={id} className="menu">
                      <h3>{food.nom}</h3>
                      <p>{food.description}</p>
                      <p>{food.formule}</p>
                      <button onClick={(e) => editableCarte(e)}>
                        <img src={editBtn} alt="edit btn" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}
      </CarteContainer>
    </Wrapper>
  );
};
const EditCarteContainer = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  padding-block: 50px;
  width: 1000px;
  min-height: 60vh;
  max-width: 100%;
  z-index: 150;
  background-color: #fff;
  font-size: var(--font-size);
  & > div:first-child {
    grid-area: 1 / 1 / 2 / 3;
  }
  & div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding-inline: 1em;
    height: 100%;
  }
  & button {
    grid-area: 3 / 1 / 4 / 3;
    width: fit-content;
  }
`;
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
