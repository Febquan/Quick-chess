// Usage
import React, { useState } from "react";
import { MyTheme } from "./style/Theme";
import Theme from "./style/Theme";
import GlobalStyle from "./style/Global";
import styled from "styled-components";
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
      <A>Hello</A>
    </Theme>
  );
};

export default App;

const A = styled.a``;
