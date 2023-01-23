import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { carteQuery } from "../data/fetchCarteData";

export default function Carte() {
  const [carteFetched, setCarteFetched] = useState();
  const [entree, setEntree] = useState([]);
  const [plat, setPlat] = useState();
  const [dessert, setDessert] = useState();
  const [menu, setMenu] = useState();

  useEffect(() => {
    carteQuery().then((data) => {
      setCarteFetched(data);
      setEntree(data.entree);
      setPlat(data.plat);
      setDessert(data.dessert);
      setMenu(data.menu);
    });
  }, []);

  function mapingSimilarityFood(food, title) {
    var regexComaString = /[,]/g;
    return food === entree || food === plat ? (
      <>
        <h1>{title}</h1>
        <div className="noshare">
          {food.map((element, id) => {
            return !element.partage ? (
              <div key={id}>
                <p>{element.nom}</p>
                <p>{element.prix}€</p>
              </div>
            ) : null;
          })}
        </div>
        <div className="share">
          <h1>à partager (ou pas . . .)</h1>
          {food.map((element, id) => {
            return element.partage ? (
              <div key={id}>
                <p>{element.nom}</p>
                <p>{element.prix}€</p>
              </div>
            ) : null;
          })}
        </div>
      </>
    ) : food === dessert ? (
      <>
        <h1>{title}</h1>
        {food.map((element, id) => {
          return (
            <div key={id}>
              <p>{element.nom}</p>
              <p>{element.prix}€</p>
            </div>
          );
        })}
      </>
    ) : (
      <>
        <h1>{title}</h1>
        {food.map((element, id) => {
          return (
            <div key={id}>
              <h2>{element.nom}</h2>
              <article>
                <p>Formule : </p>
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
  width: 1000px;
  margin: auto;
  height: 100vh;
  padding-block: 100px;
  text-align: center;
`;

const MenuContainer = styled.div`
  width: 1000px;
  margin: auto;
  height: 100vh;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`;

const LunchSection = styled.div`
  background-color: red;
  grid-area: 1 / 1 / 2 / 2;
`;
const PlatSection = styled.div`
  background-color: red;
  grid-area: 1 / 2 / 2 / 3;
`;
const DessertSection = styled.div`
  background-color: red;
  grid-area: 2 / 1 / 3 / 3;
`;
const MenuSection = styled.div`
  background-color: red;
  grid-area: 3 / 1 / 4 / 3;
`;
