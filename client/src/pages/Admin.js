import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { query } from "../data/fetchAllData";
import editBtn from "../assets/images/edit_btn.png";
import adminHoursPost from "../data/adminHoursPost";
import { Navigate } from "react-router-dom";

const Admin = () => {
  const [fet, setFet] = useState([]);
  const [hoursEdit, setHoursEdit] = useState(false);


  useEffect(() => {
    query().then((data) => setFet(data.heures));
  }, []);

  function editingHours(event, text, day, time) {
    let element = document.createElement("input");
    element.classList.add(time)
    element.setAttribute("id", day)
    element.value = text;
    event.target.parentNode.replaceChild(element, event.target);
  }

  function submitEdition(elem) {
    let data = [];
    elem.forEach((element) => {
      let day = element.getAttribute('id');
      let time = element.getAttribute('class');
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
        <h1>Heures d'ouvertures</h1>
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
                        editingHours(e, e.target.textContent, elem.day, "lunch");
                        setHoursEdit(true);
                      }}
                    >
                      {elem.lunch}
                    </td>
                    <td onClick={(e) => {
                      editingHours(e, e.target.textContent, elem.day, "dinner");
                      setHoursEdit(true);
                    }}>{elem.dinner}</td>
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

  & h1{
    font-size:var(--font-size-h1);
  }

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

        & td:nth-child(n+2):hover{
            cursor:pointer
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
const CarteContainer = styled.article``;

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-block: 150px;
`;
export default Admin;
