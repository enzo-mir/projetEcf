import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body{
        width: 100%;
        min-height: 100vh;
        background-color: #fff;
        font-family: var(--font-f-julius);
    }
    button {
        border: none;
        background-color: var(--darker-color);
        color : #fff;
        font-family: var(--font-f-julius);
        padding: 0.5rem;
        font-size: var(--font-size);
        border-radius: 10px;
      }
      button:hover {
        cursor: pointer;
      }
`;

export default GlobalStyle;
