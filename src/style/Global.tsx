import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle }; // fixxing fotmat
const GlobalStyle = styled.createGlobalStyle`
  :root {
    --primary-color: ${(props) => props.theme.primaryColor};
    --background-color: ${(props) => props.theme.backgroundColor};
    --background-color-light: ${(props) => props.theme.backgroundColorLight};
    --text-color: ${(props) => props.theme.textColor};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  /*
        2. Remove default margin
      */
  * {
    margin: 0;
  }
  /*
        3. Allow percentage-based heights in the application
      */
  html,
  body {
    height: 100%;
  }
  /*
        Typographic tweaks!
        4. Add accessible line-height
        5. Improve text rendering
      */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  /*
        6. Improve media defaults
      */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  /*
        7. Remove built-in form typography styles
      */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  /*
        8. Avoid text overflows
      */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }
  /*
        9. Create a root stacking context
      */
  #root,
  #__next {
    isolation: isolate;
    height: 100%;
  }

  :root {
    --green: #7d945d;
    --white: #eeeed5;
    --broad-size: 75vh;
    --piece-size: 3.5vh;
    --header-height: 5.5vh;
    @media (max-width: 959px) {
      --broad-size: 90vw;
      --piece-size: 3.6vw;
    }
  }

  body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: "Roboto";
    font-weight: 500;
    transition: background-color 0.5s ease, color 0.5s ease;
  }
`;
export default GlobalStyle;
