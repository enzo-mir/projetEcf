import styled from "styled-components";
const Wrapper = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 10vh;
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: fit-content;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20vh;

  & .headerPage {
    position: relative;
    width: 100%;
    height: 60vh;
    display: grid;
    place-items: center;
    background-color: var(--darker-color-a70);

    & img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -2;
      object-fit: cover;
      user-select: none;
    }
    & h1 {
      font-size: var(--font-size-h1);
      color: #fff;
      border-radius: 10px;
      padding: 1rem;
      user-select: text;
    }
  }
`;

const ContextText = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 50px;
    background-color: var(--darker-color);
    z-index: -1;
  }

  & p {
    font-size: var(--font-size-bigger);
    width: 60%;
    text-align: center;
    background-color: var(--primary-color);
    line-height: 200%;
    padding: 1.5em 1em;
  }
`;

const SectionPlats = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(2, 1fr);
  place-items: center left;
  gap: 10vh 5vw;
  width: 60%;
  min-width: 850px;

  & > img {
    grid-area: 1 / 1 / 2 / 2;
  }
  & img:nth-child(2) {
    grid-area: 2 / 1 / 3 / 2;
  }
  & img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
    transition: 0.15s ease-out;

    &:hover {
      filter: brightness(50%);
    }
  }
  & p {
    grid-area: 1 / 2 / 2 / 3;
    width: 70%;
    text-align: center;
    font-size: var(--font-size-reg);
    background-color: var(--primary-color);
    padding: 1em;
    border-radius: 10px;
    line-height: 150%;
  }
  & button {
    grid-area: 2 / 2 / 3 / 3;
    margin-bottom: auto;
    margin-right: auto;
    padding: 1em 0.5em;
  }
`;

export { Wrapper, HeroSection, ContextText, SectionPlats };
