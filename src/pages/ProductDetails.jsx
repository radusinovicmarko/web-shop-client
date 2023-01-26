import {
  AddOutlined,
  CalendarMonthOutlined,
  LocationOnOutlined,
  NewReleasesOutlined,
  SellOutlined,
  ShoppingCartOutlined
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Typography,
  Avatar
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ImageSwiper from "../components/ImageSwiper";
import NewCommentModal from "../components/NewCommentModal";
import productsService from "../services/products.service";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabvalue, setTabValue] = useState("1");
  const [product, setProduct] = useState(null);
  const [commentModalOpened, setCommentModalOpened] = useState(false);

  const { authenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    productsService
      .get(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const addNewComment = (content) => {
    productsService.addComment(product?.id, {
      content,
      dateTime: moment(),
      userId: user.id,
      productId: product?.id
    }).then((res) => {
      console.log("Uspjeh");
    }).catch((err) => console.log(err));
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
              <Tab label="Podaci o proizvodu" value="1" />
              <Tab label="Komentari i pitanja" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h6">Osnovni podaci</Typography>
                <Divider variant="fullWidth" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h4" component="h1" sx={{ mb: 2, mt: 2 }}>
                  {product?.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={4}>
                <Box>
                  <ImageSwiper pictures={product ? product.pictures : []} />
                </Box>
              </Grid>
              <Grid container item xs={12} sm={12} md={7} lg={8}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Box sx={{ height: "100%", m: 1 }}>
                    <Paper elevation={10}>
                      <Stack direction="column">
                        <Stack
                          direction="row"
                          columnGap={2}
                          sx={{ m: 1, overflowWrap: "anywhere" }}
                        >
                          <SellOutlined />
                          <Typography variant="body1">Cijena</Typography>
                        </Stack>
                        <Divider />
                        <Typography
                          variant="body1"
                          sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                        >
                          {new Intl.NumberFormat("ba", {
                            style: "currency",
                            currency: "BAM"
                          }).format(product?.price)}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Box sx={{ height: "100%", m: 1 }}>
                    <Paper elevation={10}>
                      <Stack direction="column">
                        <Stack
                          direction="row"
                          columnGap={2}
                          sx={{ m: 1, overflowWrap: "anywhere" }}
                        >
                          <NewReleasesOutlined />
                          <Typography variant="body1">Stanje</Typography>
                        </Stack>
                        <Divider />
                        <Typography
                          variant="body1"
                          sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                        >
                          {product?.newProduct ? "Nov" : "Polovan"}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Box sx={{ height: "100%", m: 1 }}>
                    <Paper elevation={10}>
                      <Stack direction="column">
                        <Stack
                          direction="row"
                          columnGap={2}
                          sx={{ m: 1, overflowWrap: "anywhere" }}
                        >
                          <LocationOnOutlined />
                          <Typography variant="body1">Lokacija</Typography>
                        </Stack>
                        <Divider />
                        <Typography
                          variant="body1"
                          sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                        >
                          {product?.location}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Box sx={{ height: "100%", m: 1 }}>
                    <Paper elevation={10}>
                      <Stack direction="column">
                        <Stack
                          direction="row"
                          columnGap={2}
                          sx={{ m: 1, overflowWrap: "break-word" }}
                        >
                          <CalendarMonthOutlined />
                          <Typography variant="body1">Datum objave</Typography>
                        </Stack>
                        <Divider />
                        <Typography
                          variant="body1"
                          sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                        >
                          {moment(product?.publishDate).format("DD. MM. yyyy. HH:mm")}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
                {product?.status !== "Active" && (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box sx={{ height: "100%", m: 1 }}>
                      <Paper elevation={10}>
                        <Stack direction="column">
                          <Stack
                            direction="row"
                            columnGap={2}
                            sx={{ m: 1, overflowWrap: "anywhere" }}
                          >
                            <NewReleasesOutlined />
                            <Typography variant="body1">Status</Typography>
                          </Stack>
                          <Divider />
                          <Typography
                            variant="body1"
                            sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                          >
                            {product?.status === "Sold"
                              ? "Prodano"
                              : "Neaktivno"}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Box>
                  </Grid>
                )}
                {product?.purchaseDate && (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box sx={{ height: "100%", m: 1 }}>
                      <Paper elevation={10}>
                        <Stack direction="column">
                          <Stack
                            direction="row"
                            columnGap={2}
                            sx={{ m: 1, overflowWrap: "anywhere" }}
                          >
                            <CalendarMonthOutlined />
                            <Typography variant="body1">
                              Datum prodaje
                            </Typography>
                          </Stack>
                          <Divider />
                          <Typography
                            variant="body1"
                            sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                          >
                            {moment(product?.purchaseDate).format(
                              "DD. MM. yyyy. HH:mm:ss"
                            )}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Box>
                  </Grid>
                )}
                {authenticated &&
                  user.id !== product?.seller.id &&
                  product?.status === "Active" && (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                      <Button
                        size="large"
                        sx={{ m: 1, overflowWrap: "break-word" }}
                        variant="outlined"
                        color="inherit"
                        startIcon={<ShoppingCartOutlined />}
                        onClick={() => navigate(`/proizvodi/${product?.id}/kupovina`)}
                      >
                        <Typography variant="body1">Kupovina</Typography>
                      </Button>
                    </Grid>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h6">Dodatni podaci</Typography>
                <Divider variant="fullWidth" />
              </Grid>
              {product?.attributes.map((attribute) => (
                <Grid
                  key={attribute.attribute.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Box sx={{ height: "100%", mt: 2 }}>
                    <Paper elevation={10}>
                      <Stack direction="column">
                        <Typography
                          variant="body1"
                          sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                        >
                          {attribute.attribute.name}
                        </Typography>
                        <Divider />
                        <Typography
                          variant="body1"
                          sx={{ m: 1, ml: 2, overflowWrap: "break-word" }}
                        >
                          {attribute.value}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 4 }}>
              <Typography variant="h6">Detaljan opis</Typography>
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box sx={{ height: "100%", width: "100%", mt: 2 }}>
                <Paper elevation={10}>
                  <Typography
                    variant="body1"
                    sx={{ p: 3, textAlign: "justify" }}
                  >
                    {product?.description}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 4 }}>
              <Typography variant="h6">Podaci o prodavcu</Typography>
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box sx={{ height: "100%", mt: 2 }}>
                <Paper elevation={10}>
                  <Stack sx={{ p: 3 }} rowGap={1}>
                    <Stack direction="row" columnGap={2}>
                      {product?.seller.avatarUrl && (
                        <Avatar src={product?.seller.avatarUrl} />
                      )}
                      {!product?.seller.avatarUrl && (
                        <Avatar>{product?.seller.username[0]}</Avatar>
                      )}
                      <Typography sx={{ mt: 1 }} variant="body1">
                        {product?.seller.username}
                      </Typography>
                    </Stack>
                    <Typography sx={{ mt: 1 }} variant="body1">
                      Ime i prezime:{" "}
                      {product?.seller.firstName +
                        " " +
                        product?.seller.lastName}
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="body1">
                      E-mail adresa: {product?.seller.email}
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="body1">
                      Kontakt telefon: {product?.seller.contactPhone}
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="body1">
                      Grad: {product?.seller.location}
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            </Grid>
            {product?.buyer && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 4 }}>
                  <Typography variant="h6">Podaci o kupcu</Typography>
                  <Divider variant="fullWidth" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box sx={{ height: "100%", mt: 2 }}>
                    <Paper elevation={10}>
                      <Stack sx={{ p: 3 }} rowGap={1}>
                        <Stack direction="row" columnGap={2} sx={{}}>
                          {product?.buyer.avatarUrl && (
                            <Avatar src={product?.buyer.avatarUrl} />
                          )}
                          {!product?.buyer.avatarUrl && (
                            <Avatar>{product?.buyer.username[0]}</Avatar>
                          )}
                          <Typography
                            sx={{ mt: 1, overflowWrap: "anywhere" }}
                            variant="body1"
                          >
                            {product?.buyer.username}
                          </Typography>
                        </Stack>
                        <Typography sx={{ mt: 1 }} variant="body1">
                          Ime i prezime:{" "}
                          {product?.buyer.firstName +
                            " " +
                            product?.buyer.lastName}
                        </Typography>
                        <Typography sx={{ mt: 1 }} variant="body1">
                          E-mail adresa: {product?.buyer.email}
                        </Typography>
                        <Typography sx={{ mt: 1 }} variant="body1">
                          Kontakt telefon: {product?.buyer.contactPhone}
                        </Typography>
                        <Typography sx={{ mt: 1 }} variant="body1">
                          Grad: {product?.buyer.location}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
              </>
            )}
          </TabPanel>
          <TabPanel value="2">
            {authenticated && product?.status === "Active" && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button
                  size="large"
                  sx={{ m: 1, overflowWrap: "break-word" }}
                  variant="outlined"
                  color="inherit"
                  startIcon={<AddOutlined />}
                  onClick={() => setCommentModalOpened(true)}
                >
                  <Typography variant="body1">Novo pitanje</Typography>
                </Button>
              </Grid>
            )}
            <Grid container>
              {product?.comments.map((comment) => (
                <Grid key={comment.id} item xs={12} sm={12} md={12} lg={12}>
                  <Box sx={{ height: "100%", mt: 2 }}>
                    <Paper elevation={10}>
                      <Stack sx={{ p: 3 }} rowGap={1}>
                        <Stack direction="row" columnGap={2}>
                          {comment.user.avatarUrl && (
                            <Avatar src={comment.user.avatarUrl} />
                          )}
                          {!comment.user.avatarUrl && (
                            <Avatar>{comment.user.username[0]}</Avatar>
                          )}
                          <Typography sx={{ mt: 1 }} variant="body1">
                            {comment.user.username}
                          </Typography>
                        </Stack>
                        <Divider variant="fullWidth" />
                        <Typography sx={{ mt: 1 }} variant="body1">
                          {comment.content}
                        </Typography>
                        <Divider variant="fullWidth" />
                        <Typography sx={{ mt: 1 }} variant="body2">
                          Datum objave:{" "}
                          {moment(comment.dateTime).format(
                            "DD. MM. yyyy. HH:mm:ss"
                          )}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <NewCommentModal open={commentModalOpened} onApply={addNewComment} onClose={() => setCommentModalOpened(false)} />
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  );
};

export default ProductDetails;
