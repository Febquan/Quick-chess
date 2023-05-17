import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MyTheme } from "./style/Theme";
import Theme from "./style/Theme";
import GlobalStyle from "./style/Global";

import { Provider } from "react-redux";
import store from "./store/store";

import MainView from "./view/MainView";
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
            <Route path="/" element={<MainView />} />
          </Routes>
        </Router>
      </Theme>
    </Provider>
  );
};

export default App;
