import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/slices/userSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../environments/firebase.config";
import CustomSnackbar from "../components/CustomSnackbar";
import { unwrapResult } from "@reduxjs/toolkit";

const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    contactPhone: "",
    location: ""
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "error"
  });

  const uploadAvatar = () => {
    const imageRef = ref(storage, `newUsers/${avatarFile.name}`);
    uploadBytes(imageRef, avatarFile)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            dispatch(register({ ...user, avatarUrl: url }));
          })
          .catch(() =>
            setSnackbarState({
              open: true,
              message: "Greška prilikom slanja slike.",
              type: "error"
            })
          );
      })
      .catch(() =>
        setSnackbarState({
          open: true,
          message: "Greška prilikom slanja slike.",
          type: "error"
        })
      );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (avatarFile) {
      uploadAvatar();
    } else {
      dispatch(register(user))
        .then(unwrapResult)
        .catch((err) =>
          setSnackbarState({
            open: true,
            type: "error",
            message:
              err.response.status === 409
                ? "Korisničko ime je zauzeto."
                : "Došlo je do greške."
          })
        );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registracija
        </Typography>
        <Box
          component="form"
          method="post"
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Ime"
                value={user.firstName}
                onChange={(event) =>
                  setUser({ ...user, firstName: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Prezime"
                name="lastName"
                autoComplete="family-name"
                value={user.lastName}
                onChange={(event) =>
                  setUser({ ...user, lastName: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Korisničko ime"
                name="username"
                value={user.username}
                onChange={(event) =>
                  setUser({ ...user, username: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email adresa"
                name="email"
                type="email"
                value={user.email}
                onChange={(event) =>
                  setUser({ ...user, email: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                label="Lozinka"
                id="password"
                autoComplete="new-password"
                value={user.password}
                onChange={(event) =>
                  setUser({ ...user, password: event.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="contactPhone"
                label="Telefon"
                name="contactPhone"
                type="tel"
                value={user.contactPhone}
                onChange={(event) =>
                  setUser({ ...user, contactPhone: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="location"
                label="Grad"
                name="location"
                value={user.location}
                onChange={(event) =>
                  setUser({ ...user, location: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Stack direction="column" rowGap={1}>
                <Button variant="outlined" color="inherit" component="label">
                  Otpremite avatar
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => setAvatarFile(event.target.files[0])}
                  />
                </Button>
                {avatarFile && (
                  <Typography>Otpremljeni avatar: {avatarFile.name}</Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registracija
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/prijava" variant="body2">
                {"Već imate nalog? Prijavite se"}
              </Link>
            </Grid>
          </Grid>
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

export default Register;
