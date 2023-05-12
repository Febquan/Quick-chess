import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MyTheme } from "./style/Theme";
import Theme from "./style/Theme";
import GlobalStyle from "./style/Global";
import styled from "styled-components";

import { Provider } from "react-redux";
import store from "./store/store";
import Broad from "./view/broad/Broad";

import MainControl from "./view/MainControl/MainControl";
import Header from "./view/Header/Header";
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
    <Provider store={store}>
      <Theme theme={theme}>
        <GlobalStyle />

        <Header toggleTheme={toggleTheme} theme={theme}></Header>

        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Wrapper>
                  <Broad />
                  <MainControl></MainControl>
                </Wrapper>
              }
            />
          </Routes>
        </Router>
      </Theme>
    </Provider>
  );
};

const Wrapper = styled.div`
  height: calc(100% - var(--header-height));
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5vw;
`;
export default App;
