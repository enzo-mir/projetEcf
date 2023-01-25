import styled from "styled-components";
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
const LogContainer = styled.section`
  position: absolute;
  display: grid;
  grid-template-rows: auto 1fr auto;
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
  .ctaLog {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;

    p {
      font-size: var(--font-size-little);
      color: var(--darker-color);
      text-decoration: underline;
      :hover {
        cursor: pointer;
      }
    }
  }
`;

const ContentSignIn = styled.div`
  display: grid;
  row-gap: 4vh;
  & .adds {
    padding-block: 50px;
    input {
      border: 1px solid var(--darker-color);
    }
  }

  div {
    display: flex;
    column-gap: 3vw;

    input {
      background-color: var(--primary-color);
      border: none;
      padding: 0.5rem 1em;
      font-size: var(--font-size);
    }
  }
`;
const ContentLogIn = styled.div`
  display: grid;
  row-gap: 4vh;
  input {
    background-color: var(--primary-color);
    border: none;
    padding: 0.5rem 1em;
    font-size: var(--font-size);
  }
`;

export { Overlay, LogContainer, ContentSignIn, ContentLogIn };
