import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/layouts/Login";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from "@material-ui/core/styles";
import style from "./assets/jss/theme";

function App() {
  const appTheme = responsiveFontSizes(createMuiTheme(style));

  return (
    <ThemeProvider theme={appTheme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
