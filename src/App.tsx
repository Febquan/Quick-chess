import React, { useState } from "react";

import { MyTheme } from "./style/Theme";
import Theme from "./style/Theme";
import GlobalStyle from "./style/Global";
import styled from "styled-components";

import { Provider } from "react-redux";
import store from "./control/gameState";
import Broad from "./view/broad/Broad";

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
      <A>
        <Provider store={store}>
          <Broad />
        </Provider>
      </A>
    </Theme>
  );
};

const A = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default App;
