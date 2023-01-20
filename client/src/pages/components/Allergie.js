import React from "react";
import styled from "styled-components";

const Allergie = ({ onchange }) => {
  return (
    <Wrapper>
      <input
        type="texte"
        placeholder="Entrez vos allergies"
        onChange={onchange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  z-index: 500;
  & input {
    width: 100%;
    padding: 0.5em 1em;
    font-size: var(--font-size);
    &::placeholder {
      color: var(--color-blackless);
    }
  }
`;
export default Allergie;
