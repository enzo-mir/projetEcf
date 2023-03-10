import styled from "styled-components";

const LogContainer = styled.section`
  position: absolute;
  &:has(div > div) {
    grid-template-rows: auto 1fr auto;
  }
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

  & p {
    text-align: center;
  }

  & h1 {
    font-size: var(--font-size-bigger);
    text-align: center;
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

    @media screen and (width <= 600px) {
      flex-direction: column;
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
      width: 50%;
    }
  }
`;
const ContentLogIn = styled.div`
  display: grid;
  place-items: center;
  gap: 5vh;

  input {
    background-color: var(--primary-color);
    border: none;
    padding: 0.5rem 1em;
    font-size: var(--font-size);
  }

  & > div {
    display: flex;
    column-gap: 3vw;
    height: 100%;
  }
`;

export { LogContainer, ContentSignIn, ContentLogIn };
