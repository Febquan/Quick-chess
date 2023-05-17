import React from "react";
import { ThemeProvider } from "styled-components";
import { ConfigProvider } from "antd";
export enum MyTheme {
  Dark,
  Light,
}

const lightTheme = {
  primaryColor: "hsl(248, 53%, 58%)",
  backgroundColor: "#e4e4e4",
  backgroundColorLight: "#d5d5d5",
  textColor: "#000",
};

const darkTheme = {
  primaryColor: "hsl(248, 53%, 58%)",
  backgroundColor: "#282c34",
  backgroundColorLight: "#1c1e24",
  textColor: "#fff",
};

type props = {
  theme: MyTheme;
  children: JSX.Element[];
};

const Theme: React.FC<props> = ({ theme, children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "hsl(248, 53%, 58%)",
        },
      }}
    >
      <ThemeProvider theme={theme == MyTheme.Dark ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default Theme;
