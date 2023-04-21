import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: ${(props) => props.theme.primaryColor};
    --background-color: ${(props) => props.theme.backgroundColor};
    --text-color: ${(props) => props.theme.textColor};
  }

  body {
    display: inline;
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: Arial, sans-serif;
    transition: background-color 0.5s ease, color 0.5s ease;
  }
  a:hover {
  color: #ff0000;
}

`;
export default GlobalStyle;
