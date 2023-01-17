import React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Activation from "./pages/Activation";
import { useSelector } from "react-redux";
import Logout from "./pages/Logout";

function App () {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2"
      },
      secondary: {
        main: "#711A75"
      },
      text: {
        main: "white"
      }
    }
  });

  const { pendingActivation, authenticated } = useSelector((state) => {
    // console.log(JSON.stringify(state.user));
    return state.user;
  });

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <Routes>
          <Route exact path="/" element={<div>A</div>} />
          <Route exact path="/registracija" element={ authenticated ? <Navigate to={"/"} /> : (pendingActivation ? <Navigate to={"/aktivacija"} /> : <Register />)} />
          <Route exact path="/prijava" element={authenticated ? <Navigate to={"/"} /> : (pendingActivation ? <Navigate to={"/aktivacija"} /> : <Login />)} />
          <Route exact path="/aktivacija" element={pendingActivation ? <Activation /> : <Navigate to={"/"} />} />
          <Route exact path="/odjava" element={authenticated ? <Logout /> : <Navigate to={"/"} />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
