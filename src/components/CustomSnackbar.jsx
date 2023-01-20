import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";

const Transition = (props) => {
  return <Slide {...props} direction="left" />;
};

const CustomSnackbar = (props) => {
  const { open, message } = props;
  const [snackbarState, setSnackbarState] = useState({
    open,
    vertical: "bottom",
    horizontal: "right",
    message,
    transition: Transition
  });

  const handleClose = () => setSnackbarState({ ...snackbarState, open: false });

  return (
    <Snackbar
      anchorOrigin={{
        vertical: snackbarState.vertical,
        horizontal: snackbarState.horizontal
      }}
      open={snackbarState.open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={snackbarState.transition}
      message={snackbarState.message}
      key={snackbarState.transition.name}
    >
      <Alert severity="error">{snackbarState.message}</Alert>
    </Snackbar>
  );
};

CustomSnackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string
};

export default CustomSnackbar;
