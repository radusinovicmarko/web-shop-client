import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
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
import CustomSnackbar from "../components/CustomSnackbar";

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
    message: "",
    type: "error"
  });
  const [openModal, setOpenModal] = useState(false);
  const [attributeSearchData, setAttributeSearchData] = useState(null);
  const [title, setTitle] = useState("");

  const pageSize = 3;

  const onSuccessfulResponse = (data) => {
    setTotal({
      totalElements: data.totalElements,
      totalPages: data.totalPages
    });
    setProducts(data.content);
  };

  useEffect(() => {
    if (categoryId !== null) {
      productsService
        .getByCategory(categoryId, page.page, pageSize)
        .then((res) => onSuccessfulResponse(res.data))
        .catch(() =>
          setSnackbarState({
            open: true,
            message: "Greška prilikom učitavanja.",
            type: "error"
          })
        );
    } else if (attributeSearchData !== null) {
      console.log(JSON.stringify(attributeSearchData));
      productsService
        .getByAttributes(
          encodeURI(JSON.stringify(attributeSearchData)),
          page.page,
          pageSize
        )
        .then((res) => onSuccessfulResponse(res.data))
        .catch(() =>
          setSnackbarState({
            open: true,
            message: "Greška prilikom učitavanja.",
            type: "error"
          })
        );
    } else {
      productsService
        .getAll(title, page.page, pageSize)
        .then((res) => onSuccessfulResponse(res.data))
        .catch(() =>
          setSnackbarState({
            open: true,
            message: "Greška prilikom učitavanja.",
            type: "error"
          })
        );
    }
  }, [page]);

  const apply = (categoryId) => {
    setCategoryId(categoryId);
    setAttributeSearchData({
      ...attributeSearchData,
      attributeId: null
    });
    setPage({ page: 0 });
  };

  const reset = () => {
    setTitle("");
    setCategoryId(null);
    setAttributeSearchData(null);
    setPage({ page: 0 });
  };

  const attributeSearch = (filters) => {
    setAttributeSearchData(filters.map((f) => {
      return {
        id: f.attribute.id,
        value: f.value,
        from: f.from,
        to: f.to
      };
    }));
    setCategoryId(null);
    setPage({ page: 0 });
  };

  return (
    <Box sx={{ m: 4 }}>
      <Stack spacing={2}>
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              value={title}
              label="Pretražite po naslovu"
              sx={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              onChange={(event) => {
                setTitle(event.target.value);
                setCategoryId(null);
                setAttributeSearchData({
                  ...attributeSearchData,
                  attributeId: null
                });
                setPage({ page: 0 });
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
              <ProductCard product={p} deletable={false} />
            </Grid>
          ))}
        </Grid>
        <Pagination
          page={page.page + 1}
          count={total.totalPages}
          onChange={(_, page) => setPage({ page: page - 1 })}
        />
      </Stack>
      <AttributeSearchModal
        open={openModal}
        onApply={attributeSearch}
        onClose={() => setOpenModal(false)}
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
    </Box>
  );
};

export default Products;
