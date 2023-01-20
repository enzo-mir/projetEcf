import React, { useEffect, useState } from "react";
import styled from "styled-components";
import downArrowCalendar from "../../assets/images/down-arrow.ico";
import calendar from "../../assets/images/calendar.png";
import guests from "../../assets/images/guests.png";
import { query } from "../../data/fetchAllData";
import postReservation from "../../data/postReservation";
import Allergie from "./Allergie";

export default function Reserv({ res }) {
  const [fet, setFet] = useState([]);
  const [dayDate, setDayDate] = useState(null);
  const [date, setDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [resError, setResError] = useState("");
  const [showAllergy, setShowAllergy] = useState(false);
  const [allergy, setAlergy] = useState();

  useEffect(() => {
    query().then((data) => setFet(data.heures));
  }, []);

  function handleChangeDate(e) {
    let dateDay = new Date(e.target.value).toLocaleDateString("fr-FR", {
      weekday: "long",
    });
    
    let fullDate = new Date(e.target.value).toLocaleDateString("fr-CA");

    setDate(fullDate);
    setDayDate(dateDay);
  }
  let lunchTable = ["12h", "12h15", "12h30", "12h45", "13h", "13h15", "13h30"];
  let dinnerTable = ["19h", "19h15", "19h30", "19h45", "20h", "20h15", "20h30"];
  let saturdayTable = [
    "19h",
    "19h15",
    "19h30",
    "19h45",
    "20h",
    "20h15",
    "20h30",
    "21h",
    "21h15",
    "21h30",
  ];
  function selectHours(e) {
    let oldTarget = document.querySelector(".selected");
    // eslint-disable-next-line no-unused-expressions
    oldTarget ? oldTarget.removeAttribute("class") : null;
    setTimeout(() => {
      let target = e.target;
      target.classList.add("selected");
    }, 200);
  }
  function returnData(time) {
    switch (time) {
      case "12H - 14H":
        return lunchTable.map((lunch, id) => {
          return (
            <button key={id} onFocus={selectHours} tabIndex={id}>
              {lunch}
            </button>
          );
        });
      case "19H - 22H":
        return dinnerTable.map((dinner, id) => {
          return (
            <button key={id} onClick={selectHours} tabIndex={id + 7}>
              {dinner}
            </button>
          );
        });
      case "19H - 23H":
        return saturdayTable.map((dinner, id) => {
          return (
            <button key={id} onClick={selectHours} tabIndex={id + 7}>
              {dinner}
            </button>
          );
        });
      case "fermer":
        return time;
      default:
        break;
    }
  }

  const ErrorReservation = () => {
    return <p>{resError}</p>;
  };

  function submitReservation(e) {
    let hourTargeted = document.querySelector(".selected")
      ? document.querySelector(".selected").textContent
      : null;

    if (guests > 0 && guests < 10) {
      if (date !== null) {
        if (email !== undefined) {
          if (name !== undefined) {
            if (hourTargeted !== null) {
              if (allergy) {
                setResError("Votre réservation à bien été pris en compte");
                postReservation(
                  guests,
                  date,
                  email,
                  name,
                  hourTargeted,
                  allergy
                );
                e.target.style.pointerEvents = "none";

                setTimeout(() => {
                  e.target.style.pointerEvents = "auto";
                  res(false);
                }, 2000);
              } else {
                setResError("Votre réservation à bien été pris en compte");
                postReservation(guests, date, email, name, hourTargeted, "");
                e.target.style.pointerEvents = "none";

                setTimeout(() => {
                  e.target.style.pointerEvents = "auto";
                  res(false);
                }, 2000);
              }
            } else setResError("Choisissez une heure de réservation");
          } else setResError("Veuillez renseignez un nom de réservation");
        } else setResError("Veuillez renseignez votre adresse e-mail");
      } else setResError("Choisissez une date de réservation");
    } else setResError("Le nombre de convives doit être compris entre 1 et 9");
  }

  return (
    <Overlay onClick={() => res(false)}>
      <ReservationContainer onClick={(e) => e.stopPropagation()}>
        <h1>Réservez votre table</h1>
        {resError ? <ErrorReservation /> : null}
        <OptionsReserv>
          <span></span>
          <input
            type="number"
            id="persons"
            max="9"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            maxLength="2"
            required
          />
          <input
            type="date"
            id="date"
            onChange={handleChangeDate}
            min={new Date().toLocaleDateString("fr-CA")}
            required
          />
          <input
            type="email"
            id="email"
            required
            placeholder="Entrez votre e-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            id="name"
            required
            placeholder="Entrez votre nom"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </OptionsReserv>
        <div id="lunchHours">
          <h2>MIDI</h2>
          <div className="hours">
            <HoursList>
              {fet.map((data) => {
                // eslint-disable-next-line no-unused-expressions
                return data.day === dayDate
                  ? dayDate === "lundi" ||
                    dayDate === "mardi" ||
                    dayDate === "jeudi" ||
                    dayDate === "mercredi" ||
                    dayDate === "vendredi" ||
                    dayDate === "samedi" ||
                    dayDate === "dimanche"
                    ? returnData(data.lunch)
                    : null
                  : null;
              })}
            </HoursList>
          </div>
        </div>
        <div id="dinerHours">
          <h2>SOIR</h2>
          <div className="hours">
            <HoursList>
              {fet.map((data) => {
                return data.day === dayDate
                  ? dayDate === "lundi" ||
                    dayDate === "mardi" ||
                    dayDate === "jeudi" ||
                    dayDate === "mercredi" ||
                    dayDate === "vendredi" ||
                    dayDate === "samedi" ||
                    dayDate === "dimanche"
                    ? returnData(data.dinner)
                    : null
                  : null;
              })}
            </HoursList>
          </div>
        </div>
        <div id="finalCase">
          <p
            onClick={(e) => {
              setShowAllergy(!showAllergy);
              setAlergy("");
            }}
          >
            Allergie(s) ?
          </p>
          {showAllergy ? (
            <Allergie onchange={(e) => setAlergy(e.target.value)} />
          ) : null}
          <button type="submit" onClick={submitReservation}>
            Réservez la table
          </button>
        </div>
      </ReservationContainer>
    </Overlay>
  );
}
const Overlay = styled.div`
  position: fixed;
  display: grid;
  place-items: center;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-blackless);
  z-index: 100;
`;
const ReservationContainer = styled.div`
  position: absolute;
  display: grid;
  gap: 5vh;
  place-items: center;
  padding-block: 50px;
  width: 1000px;
  min-height: 60vh;
  max-width: 100%;
  z-index: 150;
  background-color: #fff;
  font-size: var(--font-size);

  & h1 {
    font-size: var(--font-size-bigger);
  }
  & h2 {
    text-align: center;
  }

  & #lunchHours,
  & #dinerHours {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
  }
  .hours {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & #finalCase {
    position: relative;
    display: grid;
    place-items: center;
    grid-template-columns: auto auto;
    gap: 50px;
    & p:hover {
      cursor: pointer;
    }

    &:has(div) button {
      grid-area: 2 / 1 / 3 / 3;
    }
  }
`;

const OptionsReserv = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  column-gap: 5cqw;
  row-gap: 3cqh;

  & input {
    position: relative;
    background-color: var(--darker-color);
    color: #fff;
    border: none;
    padding: 5px 0.5em 5px 3em;
    height: 30px;
    width: 250px;
  }
  & span {
    position: absolute;
    top: 0;
    left: 0;
    background: url(${guests});
    background-size: 50%;
    background-position: 50%;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    z-index: 50;
  }

  & #email::placeholder,
  & #name::placeholder {
    color: var(--color-whiteless);
  }

  & #date {
    &::-webkit-calendar-picker-indicator {
      background: url(${downArrowCalendar});
      background-size: cover;
      width: 20px;
      height: 20px;

      &:hover {
        cursor: pointer;
      }
    }
    &::before {
      position: absolute;
      content: "";
      width: 4cqh;
      left: 0;
      height: 100%;
      background: url(${calendar});
      background-size: 50%;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }
`;

const HoursList = styled.ul`
  display: flex;
  column-gap: 2cqw;
  row-gap: 3cqh;
  font-size: var(--font-size-reg);
  flex-wrap: wrap;
  max-width: 80%;

  & button {
    background-color: var(--primary-color);
    color: inherit;
    border-radius: 5px;
    font-size: var(--font-size-reg);
    transition: 0.2s ease-out;

    &.selected {
      filter: brightness(70%);
    }
  }
`;
