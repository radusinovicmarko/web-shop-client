import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { Grid, MenuItem, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import productsService from "../services/products.service";
import { useSelector } from "react-redux";
import moment from "moment/moment";

const steps = ["Izaberite način plaćanja", "Podaci o kartici"];

const Purchase = () => {
  const { id } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const { user } = useSelector((state) => state.user);

  const handlePrev = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const purchase = () => {
    const purchase = {
      purchaseDate: moment(),
      buyerId: user.id
    };
    productsService.buyProduct(id, purchase);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ width: "calc(100% - 160px)", m: 10 }}>
        <Typography sx={{ textAlign: "center", mb: 5 }} variant="h5">
          Kupovina
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <>
            <Container sx={{ p: 5, alignItems: "center" }} maxWidth="sm">
              <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
                {"Kupovina završena!"}
              </Typography>
            </Container>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={() => setActiveStep(0)}>
                {"Povratak na početak"}
              </Button>
            </Box>
          </>
        )}
        {activeStep === 0 && (
          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              if (paymentMethod !== 0) {
                setActiveStep(2);
                purchase();
              } else setActiveStep(1);
            }}
          >
            <Container sx={{ p: 5, alignItems: "center" }} maxWidth="xs">
              <Grid
                container
                maxWidth="sm"
                sx={{ alignItems: "center" }}
                rowGap={1}
              >
                <Grid item xs={12}>
                  <Typography sx={{ textAlign: "center" }} variant="h6">
                    Izaberite način plaćanja
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={paymentMethod}
                    label="Način plaćanja"
                    required
                    select
                    fullWidth
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  >
                    <MenuItem value={0}>{"Karticom"}</MenuItem>
                    <MenuItem value={1}>{"Prilikom preuzimanja"}</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Container>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handlePrev}
                sx={{ mr: 1 }}
              >
                Nazad
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button color="inherit" variant="outlined" type="submit">
                Naprijed
              </Button>
            </Box>
          </Box>
        )}
        {activeStep === 1 && (
          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              setActiveStep(2);
              purchase();
            }}
          >
            <Container sx={{ p: 5, alignItems: "center" }} maxWidth="xs">
              <Grid container spacing={2} rowGap={1}>
                <Grid item xs={12}>
                  <Typography sx={{ textAlign: "center" }} variant="h6">
                    Podaci
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="card-number"
                    required
                    fullWidth
                    label="Broj kartice"
                    autoComplete="card-number"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                  />
                </Grid>
              </Grid>
            </Container>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handlePrev}
                sx={{ mr: 1 }}
              >
                Nazad
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button color="inherit" variant="outlined" type="submit">
                Kraj
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Purchase;