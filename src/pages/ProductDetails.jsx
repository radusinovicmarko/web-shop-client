import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Divider, Grid, Paper, Tab, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import productsService from "../services/products.service";

const ProductDetails = () => {
  const { id } = useParams();
  const [tabvalue, setTabValue] = useState("1");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    productsService
      .get(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{ width: "calc(100% - 96px)", height: "500px", m: 6 }}
    >
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabvalue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Podaci o proizvodu" value="1" />
              <Tab label="Komentari i pitanja" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h6">Osnovni podaci</Typography>
                <Divider variant="fullWidth" />
                <br />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h4" component="h1">
                  {product?.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Box>
                  <Carousel
                    animation="fade"
                    indicators={false}
                    swipe={true}
                    interval={10000}
                  >
                    {product?.pictures.map((p) => (
                      <img
                        key={p.id}
                        src={p.pictureUrl}
                        style={{ width: "100%", height: "auto" }}
                      />
                    ))}
                  </Carousel>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box sx={{ height: "100%" }}>
                  <Paper elevation={10}>B</Paper>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
    </Paper>
  );
};

export default ProductDetails;
