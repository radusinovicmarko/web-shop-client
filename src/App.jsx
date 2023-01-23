import React, { useEffect } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Activation from "./pages/Activation";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./pages/Logout";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import { CssBaseline } from "@mui/material";
import { state } from "./redux/slices/userSlice";
import Profile from "./pages/Profile";

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(state());
  }, []);

  const { pendingActivation, authenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route exact path="/proizvodi" element={<Products />} />
          <Route exact path="/proizvodi/:id" element={<ProductDetails />} />
          <Route exact path="/profil" element={authenticated ? <Profile /> : <Navigate to={"/prijava"} />} />
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
