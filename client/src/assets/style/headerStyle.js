import styled from "styled-components";

export const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-color);
  z-index: 50;

  & .imgContainer {
    padding-inline: 1em;
  }

  & nav {
    width: max-content;

    & ul {
      display: flex;
      justify-content: center;
      column-gap: 3vw;
      & li {
        display: grid;
        place-items: center;
        font-size: var(--font-size);
        & a {
          color: var(--darker-color);
          text-decoration: none;
        }
      }
    }
  }

  & #profil {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    font-size: var(--font-size-bigger);
  }

  & .profil {
    display: flex;
    justify-content: center;
    column-gap: 2vw;
    padding-inline: 1em;
  }
`;
