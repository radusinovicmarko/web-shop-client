import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/system";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import CategoriesTreeView from "../components/CategoriesTreeView";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../environments/firebase.config";
import categoryService from "../services/category.service";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import productsService from "../services/products.service";

const steps = ["Izaberite kategoriju", "Osnovni podaci", "Dodatni podaci"];

const NewProduct = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { user } = useSelector((state) => state.user);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    location: "",
    newProduct: true
  });
  const [categories, setCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [, setCategoryId] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [pictureFiles, setPictureFiles] = useState([]);

  useEffect(() => {
    categoryService
      .getAll()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const uploadPictures = async (productData) => {
    const pictureUrlsTemp = [];
    const promises = [];
    const promises2 = [];
    pictureFiles.forEach((picture) => {
      const imageRef = ref(
        storage,
        `users/${user.id}/products/${picture.name}`
      );
      const promise = uploadBytes(imageRef, picture);
      promise
        .then((snapshot) => {
          const promise2 = getDownloadURL(snapshot.ref);
          promise2
            .then((url) => {
              pictureUrlsTemp.push(url);
            })
            .catch((err) => console.log(err));
          promises2.push(promise2);
        })
        .catch((err) => console.log(err));
      promises.push(promise);
    });
    Promise.all(promises)
      .then(() => {
        return Promise.all(promises2);
      })
      .then(() => {
        const pictures = pictureUrlsTemp.map((url) => {
          return { pictureUrl: url };
        });
        productsService
          .addProduct({ ...productData, pictures })
          .then((res) => console.log(res))
          .catch(() => console.log("err"));
      });
  };

  const create = () => {
    const categoryIds = categoriesSelected
      .filter((c) => c.subcategories.length === 0)
      .map((c) => c.id);
    const productData = {
      ...product,
      publishDate: moment(),
      attributes: attributeValues,
      sellerId: user.id,
      categoryIds
    };
    uploadPictures(productData);
  };

  const onTreeItemClick = (category) => {
    setCategoryId(category.id);
    let categoriesTemp = [];
    if (!categoriesSelected.includes(category)) {
      categoriesTemp = [...categoriesSelected, category];
    } else {
      categoriesTemp = categoriesSelected.filter((c) => c.id !== category.id);
    }
    setCategoriesSelected(categoriesTemp);
    let attrs = [];
    categoriesTemp.forEach((c) => {
      attrs = [...attrs, ...c.attributes];
    });
    setAttributes(attrs);
    setAttributeValues(
      attrs.map((attribute) => {
        return { attribute, value: attribute.type === "String" ? "" : 0 };
      })
    );
  };

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handlePrev = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return (
    <Container maxWidth="md">
      <Box sx={{ width: "calc(100% - 160px)", m: 10 }}>
        <Typography sx={{ textAlign: "center", mb: 5 }} variant="h5">
          Kreiranje proizvoda
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
                {"Kreiranje završeno!"}
              </Typography>
            </Container>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={() => setActiveStep(0)}>{"Povratak na početak"}</Button>
            </Box>
          </>
        )}
        <React.Fragment>
          {activeStep === 0 && (
            <>
              <Container sx={{ p: 5, alignItems: "center" }} maxWidth="sm">
                <Grid container spacing={2} rowGap={1}>
                  <Grid item xs={12}>
                    <Stack rowGap={1}>
                      <Typography sx={{ textAlign: "center" }} variant="h6">
                        Izaberite kategoriju
                      </Typography>
                      <CategoriesTreeView
                        categories={categories}
                        onItemClick={onTreeItemClick}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ textAlign: "center" }} variant="body1">
                      Izabrane kategorije: [
                      {categoriesSelected.map((c) => c.name).join(", ")}]
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  color="inherit"
                  variant="outlined"
                  disabled={categoriesSelected.length === 0}
                  onClick={() =>
                    setActiveStep((prevActiveStep) => prevActiveStep + 1)
                  }
                >
                  Naprijed
                </Button>
              </Box>
            </>
          )}
          {activeStep === 1 && (
            <Box
              component="form"
              onSubmit={(event) => {
                event.preventDefault();
                handleNext();
              }}
            >
              <Container sx={{ p: 5, alignItems: "center" }} maxWidth="sm">
                <Grid
                  container
                  maxWidth="sm"
                  sx={{ alignItems: "center" }}
                  rowGap={1}
                >
                  <Grid item xs={12}>
                    <Typography sx={{ textAlign: "center" }} variant="h6">
                      Osnovni podaci
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="title"
                      required
                      fullWidth
                      label="Naziv"
                      value={product.title}
                      onChange={(event) =>
                        setProduct({ ...product, title: event.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Opis"
                      name="description"
                      autoComplete="off"
                      multiline
                      minRows={4}
                      value={product.description}
                      onChange={(event) =>
                        setProduct({
                          ...product,
                          description: event.target.value
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Cijena"
                      name="price"
                      autoComplete="off"
                      type="number"
                      value={product.price}
                      onChange={(event) =>
                        setProduct({ ...product, price: event.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="location"
                      required
                      fullWidth
                      label="Lokacija"
                      value={product.location}
                      onChange={(event) =>
                        setProduct({
                          ...product,
                          location: event.target.value
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={product.newProduct}
                          onChange={(event) => setProduct({ ...product, newProduct: event.target.checked })}
                        />
                      }
                      label="Nov proizvod?"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Stack direction="column" rowGap={1}>
                      <Button
                        variant="outlined"
                        color="inherit"
                        component="label"
                      >
                        Otpremite slike
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          multiple
                          onChange={(event) =>
                            setPictureFiles([...event.target.files])
                          }
                        />
                      </Button>
                      <Typography>
                        Otpremljene slike:{" "}
                        {pictureFiles.map((f) => f.name).join(", ")}
                      </Typography>
                    </Stack>
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
          {activeStep === 2 && (
            <Box
              component="form"
              onSubmit={(event) => {
                event.preventDefault();
                handleNext();
                create();
              }}
            >
              <Container sx={{ p: 5, alignItems: "center" }} maxWidth="sm">
                <Grid container spacing={2} rowGap={1}>
                  <Grid item xs={12}>
                    <Typography sx={{ textAlign: "center" }} variant="h6">
                      Dodatni podaci
                    </Typography>
                  </Grid>
                  {attributes.map((attribute, index) => (
                    <Grid key={attribute.id} item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label={attribute.name}
                        name={attribute.name}
                        type={attribute.type === "String" ? "text" : "number"}
                        value={attributeValues.at(index).value}
                        onChange={(event) => {
                          attributeValues.forEach((a) => {
                            if (a.attribute.id === attribute.id) {
                              a.value = event.target.value;
                            }
                          });
                          setAttributeValues([...attributeValues]);
                        }}
                      />
                    </Grid>
                  ))}
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
                  Kreirajte
                </Button>
              </Box>
            </Box>
          )}
        </React.Fragment>
      </Box>
    </Container>
  );
};

export default NewProduct;
