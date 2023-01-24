import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { carteQuery } from "../data/fetchCarteData";
import Reserv from "./components/Reserv";

export default function Carte() {
  const [carteFetched, setCarteFetched] = useState();
  const [entree, setEntree] = useState([]);
  const [plat, setPlat] = useState();
  const [dessert, setDessert] = useState();
  const [menu, setMenu] = useState();
  const [res, setRes] = useState(false);

  useEffect(() => {
    document.querySelectorAll(".btnReserve").forEach((resBtn) => {
      resBtn.addEventListener("click", () => {
        setRes(true);
      });
    });
    carteQuery().then((data) => {
      setCarteFetched(data);
      setEntree(data.entree);
      setPlat(data.plat);
      setDessert(data.dessert);
      setMenu(data.menu);
    });
  }, []);

  function mapingSimilarityFood(food, title) {
    return food === entree || food === plat ? (
      <>
        <h2>{title}</h2>
        <div className="noshare">
          {food.map((element, id) => {
            return !element.partage ? (
              <div key={id}>
                <div>
                  <p>{element.nom}</p>
                  <p className="desc">{element.description}</p>
                </div>
                <p>{element.prix}€</p>
              </div>
            ) : null;
          })}
        </div>
        <div className="share">
          <h2>à partager (ou pas . . .)</h2>
          {food.map((element, id) => {
            return element.partage ? (
              <div key={id}>
                <div>
                  <p>{element.nom}</p>
                  <p className="desc">{element.description}</p>
                </div>
                <p>{element.prix}€</p>
              </div>
            ) : null;
          })}
        </div>
      </>
    ) : food === dessert ? (
      <>
        <h2>{title}</h2>
        {food.map((element, id) => {
          return (
            <div key={id}>
              <div>
                <p>{element.nom}</p>
                <p className="desc">{element.description}</p>
              </div>
              <p>{element.prix}€</p>
            </div>
          );
        })}
      </>
    ) : (
      <>
        <h2>{title}</h2>
        {food.map((element, id) => {
          return (
            <div key={id}>
              <p>{element.nom}</p>
              <article>
                <p>Formules : </p>
                <aside>
                  {element.formule.split(",").map((formule, index) => {
                    return (
                      <>
                        <div key={index}>{formule}</div>
                      </>
                    );
                  })}
                </aside>
              </article>
            </div>
          );
        })}
      </>
    );
  }

  return carteFetched !== undefined ? (
    <>
      {res && <Reserv res={setRes} />}
      <CarteContainer>
        <h1>La carte des menus</h1>
        <MenuContainer>
          <LunchSection>
            {mapingSimilarityFood(entree, "les entrées")}
          </LunchSection>
          <PlatSection>{mapingSimilarityFood(plat, "les plats")}</PlatSection>
          <DessertSection>
            {mapingSimilarityFood(dessert, "les desserts")}
          </DessertSection>
          <MenuSection>{mapingSimilarityFood(menu, "les menus")}</MenuSection>
        </MenuContainer>
      </CarteContainer>
    </>
  ) : (
    <div>Chargement</div>
  );
}

const CarteContainer = styled.main`
  position: relative;
  width: 1000px;
  margin: auto;
  min-height: max-content;
  padding-block: 150px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  background-color: var(--primary-color);
  padding-inline: 2vw;

  & h1 {
    position: relative;
    font-size: var(--font-size-h1);
    display: grid;
    place-items: center;
    width: max-content;

    ::after,
    ::before {
      content: "";
      position: absolute;
      width: clamp(10px, 1.5vw, 15px);
      height: clamp(10px, 1.5vw, 15px);
      background-color: black;
      border-radius: 50%;
    }
    ::after {
      right: 0;
      transform: translateX(200%);
    }
    ::before {
      left: 0;
      transform: translateX(-200%);
    }
  }

  & h2 {
    font-size: var(--font-size-bigger);
    color: var(--darker-color);
  }

  .desc {
    font-size: var(--font-size-little);
    color: var(--darker-color);
  }
`;

const MenuContainer = styled.div`
  position: relative;
  width: 1000px;
  min-height: max-content;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(2, 1fr);

  & > div {
    width: 100%;
    height: 100%;
    margin-block: 50px;

    & p {
      text-align: left;
      width: 100%;
      font-size: var(--font-size-reg);
    }
  }
`;

const LunchSection = styled.div`
  background-color: #fff;
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;

  & > div {
    min-width: max-content;
    width: 80%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;

    > div {
      display: grid;
      grid-template-columns: 1fr auto;
      column-gap: 20px;
      width: 100%;
    }
  }
`;
const PlatSection = styled.div`
  background-color: #fff;
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;

  & > div {
    min-width: max-content;
    width: 80%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;

    > div {
      display: grid;
      grid-template-columns: 1fr auto;
      column-gap: 20px;
      width: 100%;
    }
  }
`;
const DessertSection = styled.div`
  background-color: #fff;
  grid-area: 2 / 1 / 3 / 3;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  column-gap: 50px;
  place-items: center;

  h2 {
    grid-area: 1 / 1 / 2 / 3;
  }

  & > div {
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 20px;
    width: 60%;
  }
`;
const MenuSection = styled.div`
  background-color: #fff;
  grid-area: 3 / 1 / 4 / 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 25px;

    article {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 25px;
      font-size: var(--font-size);

      > p {
        color: var(--darker-color);
        text-align: center;
      }
      aside {
        display: grid;
        gap: 10px;
      }
    }
  }
`;
