import styled from "styled-components";

const CarteContainer = styled.main`
  position: relative;
  width: 1000px;
  margin: auto;
  min-height: max-content;
  padding-block: 150px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  background-color: var(--primary-color);
  padding-inline: 2vw;

  & h1 {
    position: relative;
    font-size: var(--font-size-h1);
    display: grid;
    place-items: center;
    width: max-content;
    color: transparent;
    -webkit-text-stroke: 1px;
    -webkit-text-stroke-color: rgb(0, 0, 0);

    ::after,
    ::before {
      content: "";
      position: absolute;
      width: clamp(10px, 60%, 60%);
      height: 4px;
      background: transparent;
      border: 1px solid black;
      border-radius: 10px;
    }
    ::after {
      top: -25%;
    }
    ::before {
      bottom: -25%;
    }
  }

  & h2 {
    font-size: var(--font-size-bigger);
    color: var(--darker-color);
  }

  .desc {
    font-size: var(--font-size-little);
    color: var(--darker-color);
  }
`;

const MenuContainer = styled.div`
  position: relative;
  width: 1000px;
  min-height: max-content;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(2, 1fr);

  & > div {
    width: 100%;
    height: 100%;
    margin-block: 50px;

    & p {
      text-align: left;
      width: 100%;
      font-size: var(--font-size-reg);
    }
  }
`;

const LunchSection = styled.div`
  background-color: #fff;
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;

  & > div {
    min-width: max-content;
    width: 80%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;

    > div {
      display: grid;
      grid-template-columns: 1fr auto;
      column-gap: 20px;
      width: 100%;
    }
  }
`;
const PlatSection = styled.div`
  background-color: #fff;
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;

  & > div {
    min-width: max-content;
    width: 80%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;

    > div {
      display: grid;
      grid-template-columns: 1fr auto;
      column-gap: 20px;
      width: 100%;
    }
  }
`;
const DessertSection = styled.div`
  background-color: #fff;
  grid-area: 2 / 1 / 3 / 3;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  column-gap: 50px;
  place-items: center;

  h2 {
    grid-area: 1 / 1 / 2 / 3;
  }

  & > div {
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 20px;
    width: 60%;
  }
`;
const MenuSection = styled.div`
  background-color: #fff;
  grid-area: 3 / 1 / 4 / 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 25px;

    article {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 25px;
      font-size: var(--font-size);

      > p {
        color: var(--darker-color);
        text-align: center;
      }
      aside {
        display: grid;
        gap: 10px;
      }
    }
  }
`;

export {
  CarteContainer,
  MenuContainer,
  LunchSection,
  PlatSection,
  DessertSection,
  MenuSection,
};
