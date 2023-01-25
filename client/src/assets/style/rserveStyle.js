import styled from "styled-components";
import downArrowCalendar from "../images/down-arrow.ico";
import calendar from "../images/calendar.png";
import guests from "../images/guests.png";

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

export { Overlay, OptionsReserv, ReservationContainer, HoursList };
