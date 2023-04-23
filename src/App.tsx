import React, { useState } from "react";

import { MyTheme } from "./style/Theme";
import Theme from "./style/Theme";
import GlobalStyle from "./style/Global";
import styled from "styled-components";

import Broad from "./view/Broad";

const App: React.FC = () => {
  const [theme, setTheme] = useState<MyTheme>(MyTheme.Dark);

  const toggleTheme = () => {
    if (theme === MyTheme.Dark) {
      setTheme(MyTheme.Light);
    } else {
      setTheme(MyTheme.Dark);
    }
  };

  return (
    <Theme theme={theme}>
      <GlobalStyle />
      <button onClick={toggleTheme}>Toggle Theme</button>
      <h1>Hello, World!</h1>
      <p>This is a paragraph.</p>
      <A>
        <Broad />
      </A>
    </Theme>
  );
};

const A = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default App;
