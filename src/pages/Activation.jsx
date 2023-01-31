import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { activate } from "../redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomSnackbar from "../components/CustomSnackbar";

const Activation = () => {
  const dispatch = useDispatch();
  const [pin, setPin] = useState("");
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "error"
  });

  const { user } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    const activation = {
      username: user.username,
      pin
    };
    dispatch(activate(activation))
      .then(unwrapResult)
      .catch(() => setSnackbarState({
        open: true,
        type: "error",
        message: "Aktivacija neuspješna, provjerite pin."
      }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Aktivacija naloga
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="pin"
            label="PIN"
            name="pin"
            value={pin}
            onChange={(event) => setPin(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Aktivacija
          </Button>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbarState.open}
        type={snackbarState.type}
        message={snackbarState.message}
        onClose={() =>
          setSnackbarState({
            ...snackbarState,
            open: false
          })
        }
      />
    </Container>
  );
};

export default Activation;
