import React from "react";
import { ThemeProvider } from "styled-components";

export enum MyTheme {
  Dark,
  Light,
}

const lightTheme = {
  primaryColor: "#008080",
  backgroundColor: "#fff",
  textColor: "#000",
};

const darkTheme = {
  primaryColor: "#00CED1",
  backgroundColor: "#282c34",
  textColor: "#fff",
};

type props = {
  theme: MyTheme;
  children: JSX.Element[];
};

const Theme: React.FC<props> = ({ theme, children }) => {
  return (
    <ThemeProvider theme={theme == MyTheme.Dark ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;
