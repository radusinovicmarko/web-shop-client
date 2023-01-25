import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../environments/firebase.config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "80vw",
    sm: "60vw",
    md: "50vw",
    lg: "30vw"
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column"
};

const UpdateProfileModal = (props) => {
  const { user, onApply, onClose, open } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [userData, setUserData] = useState({ ...user, password: "" });
  const [passwordChange, setPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const uploadAvatar = () => {
    const imageRef = ref(storage, `users/${user.id}/${avatarFile.name}`);
    uploadBytes(imageRef, avatarFile)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setAvatarUrl(url);
            passwordChange
              ? onApply({ ...userData, newPassword, avatarUrl: url })
              : onApply({ ...userData, avatarUrl: url });
            onClose();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const apply = (event) => {
    event.preventDefault();
    if (avatarFile) {
      uploadAvatar();
      setUserData({ ...userData, avatarUrl });
      console.log(JSON.stringify(avatarUrl) + "A");
    } else {
      passwordChange
        ? onApply({ ...userData, newPassword })
        : onApply(userData);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        method="post"
        onSubmit={apply}
        sx={{ ...style, alignItems: "center" }}
      >
        <Grid container spacing={2} rowGap={1}>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }} variant="h5">
              Promjena podataka
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="Ime"
              value={userData?.firstName}
              onChange={(event) =>
                setUserData({ ...userData, firstName: event.target.value })
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
              autoComplete="username"
              value={userData?.lastName}
              onChange={(event) =>
                setUserData({ ...userData, lastName: event.target.value })
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
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email adresa"
              name="email"
              type="email"
              value={userData?.email}
              onChange={(event) =>
                setUserData({ ...userData, email: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="contactPhone"
              label="Telefon"
              name="contactPhone"
              value={userData?.contactPhone}
              onChange={(event) =>
                setUserData({ ...userData, contactPhone: event.target.value })
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
              autoComplete="location"
              value={userData?.location}
              onChange={(event) =>
                setUserData({ ...userData, location: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => setPasswordChange(event.target.checked)}
                />
              }
              label="Promjena lozinke?"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={passwordChange}
              fullWidth
              type={showPassword ? "text" : "password"}
              name="newPassword"
              label="Nova lozinka"
              id="new-password"
              autoComplete="new-password"
              disabled={!passwordChange}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      disabled={!passwordChange}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
              autoComplete="current-password"
              value={userData?.password}
              onChange={(event) =>
                setUserData({ ...userData, password: event.target.value })
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
        </Grid>
        <Button
          type="submit"
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
          color="inherit"
        >
          Promijenite
        </Button>
      </Box>
    </Modal>
  );
};

UpdateProfileModal.propTypes = {
  user: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onApply: PropTypes.func
};

export default UpdateProfileModal;
