import React, { useState } from "react";
import { Modal, Typography, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "70vw",
    sm: "50vw",
    md: "40vw",
    lg: "30vw"
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column"
};

const NewCommentModal = (props) => {
  const { onApply, onClose, open } = props;
  const [content, setContent] = useState("");

  const apply = () => {
    onApply(content);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, alignItems: "center" }}>
        <Typography sx={{ textAlign: "center" }} variant="h5">
          Novi komentar
        </Typography>
        <br />
        <TextField
          label="Sadržaj komentara"
          multiline
          value={content}
          onChange={(event) => {
            event.preventDefault();
            setContent(event.target.value);
          }}
          sx={{ width: "100%" }}
          minRows={5}
        />
        <br />
        <Button
          size="medium"
          sx={{ m: 1, overflowWrap: "break-word" }}
          variant="outlined"
          color="inherit"
          onClick={apply}
        >
          <Typography variant="body1">Postavite komentar</Typography>
        </Button>
      </Box>
    </Modal>
  );
};

NewCommentModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onApply: PropTypes.func
};

export default NewCommentModal;
