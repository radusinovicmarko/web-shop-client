import {
  EditOutlined,
  EmailOutlined,
  LocationCityOutlined,
  PersonOutlineOutlined,
  PhoneOutlined
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Button,
  Divider,
  Grid,
  Pagination,
  Paper,
  Stack,
  Tab,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import ProductCard from "../components/ProductCard";
import UpdateProfileModal from "../components/UpdateProfileModal";
import { updateProfile } from "../redux/slices/userSlice";
import productsService from "../services/products.service";
import usersService from "../services/users.service";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tabvalue, setTabValue] = useState("1");
  const [myProducts, setMyProducts] = useState({
    products: [],
    pageSize: 8,
    totalElements: 0,
    totalPages: 0
  });
  const [purchases, setPurchases] = useState({
    products: [],
    pageSize: 8,
    totalElements: 0,
    totalPages: 0
  });
  const [myProductsPage, setMyProductsPage] = useState({ page: 0 });
  const [purchasesPage, setMyPurchasesPage] = useState({ page: 0 });
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "error"
  });

  const handleError = (err) => {
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
  };

  useEffect(() => {
    usersService
      .getMyProducts(user.id, myProductsPage.page, myProducts.pageSize)
      .then((res) =>
        setMyProducts({
          ...myProducts,
          products: res.data.content,
          totalElements: res.data.totalElements,
          totalPages: res.data.totalPages
        })
      )
      .catch((err) => {
        if (err.response.status !== 403) {
          setSnackbarState({
            open: true,
            type: "error",
            message: "Došlo je do greške."
          });
        }
      });
  }, [myProductsPage]);

  useEffect(() => {
    usersService
      .getPurchases(user.id, purchasesPage.page, purchases.pageSize)
      .then((res) =>
        setPurchases({
          ...purchases,
          products: res.data.content,
          totalElements: res.data.totalElements,
          totalPages: res.data.totalPages
        })
      )
      .catch(handleError);
  }, [purchasesPage]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onUpdateProfile = (userData) => {
    dispatch(updateProfile({ id: user.id, user: userData }))
      .then(unwrapResult)
      .then(() => setSnackbarState({
        open: true,
        type: "success",
        message: "Uspješna promjena!"
      }))
      .catch(handleError);
  };

  const deleteProduct = (product) => {
    productsService
      .deleteProduct(product.id)
      .then((res) => {
        setMyProductsPage({ page: 0 });
      })
      .catch(handleError);
  };

  return (
    <Paper
      elevation={3}
      sx={{ width: "calc(100% - 96px)", height: "auto", m: 6 }}
    >
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabvalue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Moji podaci" value="1" />
              <Tab label="Moji proizvodi" value="2" />
              <Tab label="Moje kupovine" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} md={4} lg={3}>
                <img
                  style={{ height: "auto", maxWidth: "100%" }}
                  alt="Avatar nije podešen."
                  src={user.avatarUrl}
                />
              </Grid>
              <Grid container item xs={12} sm={12} md={8} lg={9}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Box sx={{ height: "100%", m: 1 }}>
                    <Paper elevation={10}>
                      <Stack direction="column">
                        <Stack
                          direction="row"
                          columnGap={2}
                          sx={{ m: 1, overflowWrap: "anywhere" }}
                        >
                          <PersonOutlineOutlined />
                          <Typography variant="body1">
                            {"Korisničko ime"}
                          </Typography>
                        </Stack>
                        <Divider />
                        <Typography
                          variant="body1"
                          sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                        >
                          {user.username}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Box sx={{ height: "100%", m: 1 }}>
                    <Paper elevation={10}>
                      <Stack direction="column">
                        <Stack
                          direction="row"
                          columnGap={2}
                          sx={{ m: 1, overflowWrap: "anywhere" }}
                        >
                          <PersonOutlineOutlined />
                          <Typography variant="body1">Ime i prezime</Typography>
                        </Stack>
                        <Divider />
                        <Typography
                          variant="body1"
                          sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                        >
                          {user.firstName + " " + user.lastName}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Box sx={{ height: "100%", m: 1 }}>
                    <Paper elevation={10}>
                      <Stack direction="column">
                        <Stack
                          direction="row"
                          columnGap={2}
                          sx={{ m: 1, overflowWrap: "anywhere" }}
                        >
                          <EmailOutlined />
                          <Typography variant="body1">E-mail adresa</Typography>
                        </Stack>
                        <Divider />
                        <Typography
                          variant="body1"
                          sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                        >
                          {user.email}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Box sx={{ height: "100%", m: 1 }}>
                    <Paper elevation={10}>
                      <Stack direction="column">
                        <Stack
                          direction="row"
                          columnGap={2}
                          sx={{ m: 1, overflowWrap: "break-word" }}
                        >
                          <PhoneOutlined />
                          <Typography variant="body1">
                            Kontakt telefon
                          </Typography>
                        </Stack>
                        <Divider />
                        <Typography
                          variant="body1"
                          sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                        >
                          {user.contactPhone}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Box sx={{ height: "100%", m: 1 }}>
                    <Paper elevation={10}>
                      <Stack direction="column">
                        <Stack
                          direction="row"
                          columnGap={2}
                          sx={{ m: 1, overflowWrap: "anywhere" }}
                        >
                          <LocationCityOutlined />
                          <Typography variant="body1">Grad</Typography>
                        </Stack>
                        <Divider />
                        <Typography
                          variant="body1"
                          sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                        >
                          {user.location}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Button
                  size="large"
                  sx={{ m: 1, overflowWrap: "break-word" }}
                  variant="outlined"
                  color="inherit"
                  startIcon={<EditOutlined />}
                  onClick={() => setUpdateModalOpened(true)}
                >
                  <Typography variant="body1">Promijenite podatke</Typography>
                </Button>
              </Grid>
            </Grid>
            <UpdateProfileModal
              open={updateModalOpened}
              onApply={onUpdateProfile}
              onClose={() => setUpdateModalOpened(false)}
              user={user}
            />
          </TabPanel>
          <TabPanel value="2">
            <Stack spacing={2}>
              <Grid container spacing={2}>
                {myProducts.products.map((p) => (
                  <Grid key={p.id} item xs={12} sm={6} md={4} lg={3}>
                    <ProductCard
                      product={p}
                      deletable={true}
                      onDelete={() => deleteProduct(p)}
                    />
                  </Grid>
                ))}
              </Grid>
              <Pagination
                page={myProductsPage.page + 1}
                count={myProducts.totalPages}
                onChange={(_, page) => setMyProductsPage({ page: page - 1 })}
              />
            </Stack>
          </TabPanel>
          <TabPanel value="3">
            <Stack spacing={2}>
              <Grid container spacing={2}>
                {purchases.products.map((p) => (
                  <Grid key={p.id} item xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={p} deletable={false} />
                  </Grid>
                ))}
              </Grid>
              <Pagination
                page={purchasesPage.page + 1}
                count={purchases.totalPages}
                onChange={(_, page) => setMyPurchasesPage({ page: page - 1 })}
              />
            </Stack>
          </TabPanel>
        </TabContext>
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
    </Paper>
  );
};

export default Profile;
