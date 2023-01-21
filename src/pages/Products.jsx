import {
  Alert,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Slide,
  Snackbar,
  TextField,
  Tooltip
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productsService from "../services/products.service";
import SearchIcon from "@mui/icons-material/Search";
import CategoryFilter from "../components/CategoryFilter";
import AttributeSearchModal from "../components/AttributeSearchModal";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";

const Transition = (props) => {
  return <Slide {...props} direction="left" />;
};

const Products = () => {
  const [page, setPage] = useState({ page: 0 });
  const [categoryId, setCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState({
    totalElements: 0,
    totalPages: 0
  });
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    message: "",
    transition: Transition
  });
  const [openModal, setOpenModal] = useState(false);

  const pageSize = 1;

  const handleClose = () => setSnackbarState({ ...snackbarState, open: false });

  useEffect(() => {
    categoryId !== null
      ? productsService
        .getByCategory(categoryId, page.page, pageSize)
        .then((res) => {
          setTotal({
            totalElements: res.data.totalElements,
            totalPages: res.data.totalPages
          });
          setProducts(res.data.content);
        })
        .catch(() =>
          setSnackbarState({
            ...snackbarState,
            open: true,
            message: "Greška prilikom učitavanja."
          })
        )
      : productsService
        .getAll(page.page, pageSize)
        .then((res) => {
          setTotal({
            totalElements: res.data.totalElements,
            totalPages: res.data.totalPages
          });
          setProducts(res.data.content);
        })
        .catch(() =>
          setSnackbarState({
            ...snackbarState,
            open: true,
            message: "Greška prilikom učitavanja."
          })
        );
  }, [page]);

  const apply = (categoryId) => {
    setCategoryId(categoryId);
    setPage({ page: 0 });
  };

  const reset = () => {
    setCategoryId(null);
    setPage({ page: 0 });
  };

  const attributeSearch = (attrbuteId, value, from, to) => {
    console.log(attrbuteId + " " + value + " " + from + " " + to);
  };

  return (
    <Box sx={{ m: 4 }}>
      <Stack spacing={2}>
        <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              label="Pretražite po naslovu"
              sx={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            ></TextField>
          </Grid>
          <Grid item xs={1} md={1} lg={1}>
            <Stack direction={"row"}>
              <CategoryFilter onApply={apply} />
              <Tooltip title="Dodatna pretraga" sx={{ mt: 1 }}>
                <IconButton onClick={() => setOpenModal(true)}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Obrišite filtere" sx={{ mt: 1 }}>
                <IconButton onClick={reset}>
                  <FilterAltOffOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid key={p.id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={total.totalPages}
          onChange={(_, page) => setPage({ page: page - 1 })}
        />
      </Stack>
      <AttributeSearchModal open={openModal} onApply={attributeSearch} onClose={() => setOpenModal(false)} />
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
    </Box>
  );
};

export default Products;
