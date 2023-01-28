import React from "react";
import { Overlay } from "../../assets/style/overlay";
import { userData } from "../../data/Connect";
import styled from "styled-components";

const ProfilComponent = ({ displayProfil }) => {
  return (
    <Overlay onClick={() => displayProfil(false)}>
      <ContainerSettings onClick={(e) => e.stopPropagation()}>
        <p>
          nom : <strong contentEditable={"true"}>{userData.userName}</strong>
        </p>
        <p>
          e-mail : <strong contentEditable={"true"}>{userData.email}</strong>
        </p>
        <p>
          convives (par défaut) : <strong contentEditable={"true"}>{userData.convive}</strong>
        </p>
        <p>
          alergies :<strong contentEditable={"true"}>{userData.alergie === "undefined" ? " aucune" : userData.alergie}</strong>
        </p>
        <p>
          mot de passe :
          <strong contentEditable={"true"}>{userData.password}</strong>
        </p>
        <button
          onClick={() => {
            window.localStorage.clear("userLogin");
            window.location.href = "/";
          }}
        >
          Déconnection
        </button>
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
`;

export default ProfilComponent;
