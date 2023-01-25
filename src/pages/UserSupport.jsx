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

const UserSupport = () => {
  const { user } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const create = (event) => {
    event.preventDefault();
    const message = { title, content, userId: user.id };
    messagesService.addMessage(message).then(() => console.log("Success")).catch((err) => console.log(err));
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
    </Container>
  );
};

export default UserSupport;
