import React, { useState } from "react";
import { Overlay } from "../../assets/style/overlay";
import { userData } from "../../data/Connect";
import styled from "styled-components";

const ProfilComponent = ({ displayProfil }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(userData.userName);
  const [email, setEmail] = useState(userData.email);
  const [guests, setGuests] = useState(userData.convive);
  const [alergy, setAlergy] = useState(userData.alergie);
  const [password, setPassword] = useState();

  function edit(content) {
    return editable === false ? (
      content === name ? (
        <strong>{name}</strong>
      ) : content === email ? (
        <strong>{email}</strong>
      ) : content === guests ? (
        <strong>{guests}</strong>
      ) : content === alergy ? (
        <strong>{alergy}</strong>
      ) : null
    ) : content === name ? (
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    ) : content === email ? (
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    ) : content === guests ? (
      <input
        type="number"
        min="1"
        max="9"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />
    ) : content === alergy ? (
      <input
        type="text"
        value={alergy}
        onChange={(e) => setAlergy(e.target.value)}
      />
    ) : null;
  }

  return (
    <Overlay onClick={() => displayProfil(false)}>
      <ContainerSettings onClick={(e) => e.stopPropagation()}>
        <div className="profilAcount">
          <p>nom : {edit(name)}</p>
          <p>e-mail : {edit(email)}</p>
        </div>
        <div className="addsOn">
          <p>convives (par défaut) : {edit(guests)}</p>
          <p>alergies : {edit(alergy)}</p>
        </div>
        <p>
          mot de passe :<strong> {userData.password}</strong>
        </p>
        <div className="cta">
          {!editable ? (
            <button
              onClick={() => {
                setEditable(!editable);
              }}
            >
              Éditer les infos
            </button>
          ) : (
            <button
              onClick={() => {
                setEditable(!editable);
              }}
            >
              Fin de l'édition
            </button>
          )}
          <button
            onClick={() => {
              window.localStorage.clear("userLogin");
              window.location.href = "/";
            }}
          >
            Déconnection
          </button>
        </div>
      </ContainerSettings>
    </Overlay>
  );
};

const ContainerSettings = styled.div`
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

  & div {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    place-items: center;
  }
`;

export default ProfilComponent;
