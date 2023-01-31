import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import messagesService from "../services/messages.service";
import CustomSnackbar from "../components/CustomSnackbar";
import { useNavigate } from "react-router-dom";

const UserSupport = () => {
  const { user } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "error"
  });

  const navigate = useNavigate();

  const create = (event) => {
    event.preventDefault();
    const message = { title, content, userId: user.id };
    messagesService.addMessage(message).then(() => setSnackbarState({
      open: true,
      message: "Uspješno poslano!",
      type: "success"
    })).catch((err) => {
      setSnackbarState({
        open: true,
        type: "error",
        message: err.response.status === 403 ? "Vaša sesija je istekla. Prijavite se ponovo." : "Došlo je do greške."
      });
      if (err.response.status === 403) {
        setTimeout(() => {
          navigate("/odjava");
        }, 1500);
      }
    });
    setTitle("");
    setContent("");
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        method="post"
        onSubmit={create}
        sx={{
          m: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Grid container spacing={2} rowGap={1}>
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center" }} variant="h5">
              Nova poruka
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="title"
              required
              fullWidth
              label="Naslov"
              value={title}
              onChange={(event) => setTitle(event.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Sadržaj"
              name="content"
              autoComplete="off"
              multiline
              minRows={4}
              value={content}
              onChange={(event) => setContent(event.target.value)} />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
          color="inherit"
        >
          {"Pošaljite poruku"}
        </Button>
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

export default UserSupport;
