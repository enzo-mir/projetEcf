import React from "react";
import styled from "styled-components";

export default function Reserv() {
  
  return (
    <Overlay>
      <ReservationContainer>
        <h1>Réservez votre table</h1>
        <div id="optionsReserv">
          <input type="number" id="persons" min="1" max="8" />
          <input type="date" id="date" />
        </div>
        <div id="lunchHours">
          <h2>MIDI</h2>
          <div className="hours">{<switchDay />}</div>
        </div>
        <div id="dinerHours">
          <h2>SOIR</h2>
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
  width: 1000px;
  min-height: 60vh;
  max-width: 100%;
  background-color: #fff;
`;
