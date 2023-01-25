/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import categoryService from "../services/category.service";
import { Stack } from "@mui/system";
import CategoriesTreeView from "./CategoriesTreeView";

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
  p: 4
};

const AttributeSearchModal = (props) => {
  const { onApply, onClose, open } = props;
  const [categories, setCategories] = useState([]);
  const [, setCategoryId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributeId, setSelectedAttributeId] = useState({ id: "" });
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    categoryService
      .getAll()
      .then((res) => setCategories(res.data))
      .catch(() => console.log("err"));
  }, []);

  useEffect(() => {
    if (selectedCategory) setAttributes(selectedCategory.attributes);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedAttributeId.id !== "") {
      setSelectedAttribute(
        selectedCategory.attributes.filter(
          (a) => a.id === selectedAttributeId.id
        )[0]
      );
    }
  }, [selectedAttributeId]);

  const apply = () => {
    if (selectedAttributeId.id !== "") {
      onApply(selectedAttributeId.id, value, from, to);
      onClose();
    }
  };

  const onTreeItemClick = (category) => {
    setSelectedAttributeId({ id: "" });
    setSelectedAttribute(null);
    setCategoryId(category.id);
    setSelectedCategory(category);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography sx={{ textAlign: "center" }} variant="h6">
          Izaberite kategoriju
        </Typography>
        <br />
        <CategoriesTreeView onItemClick={onTreeItemClick} categories={categories} />
        <br />
        <br />
        <TextField
          value={selectedAttributeId.id}
          size="small"
          label="Izaberite atribut"
          select
          sx={{
            width: "100%"
          }}
          onChange={(event) => {
            event.preventDefault();
            setSelectedAttributeId({ id: event.target.value });
          }}
        >
          {attributes.map((attribute) => (
            <MenuItem key={attribute.id} value={attribute.id}>
              {attribute.name}
            </MenuItem>
          ))}
        </TextField>
        <Stack rowGap={2}>
          <br />
          {selectedAttribute?.type === "String" && (
            <TextField
              size="small"
              id="outlined-basic"
              label="Vrijednost"
              variant="outlined"
              value={value}
              onChange={(event) => {
                event.preventDefault();
                setValue(event.target.value);
              }}
            />
          )}
          {selectedAttribute?.type === "Integer" && (
            <Stack direction="row" columnGap={1}>
              <TextField
                type={"number"}
                size="small"
                id="outlined-basic"
                label="Od"
                variant="outlined"
                value={from}
                onChange={(event) => {
                  event.preventDefault();
                  setFrom(event.target.value);
                }}
              />
              <TextField
                type={"number"}
                size="small"
                id="outlined-basic"
                label="Do"
                variant="outlined"
                value={to}
                onChange={(event) => {
                  event.preventDefault();
                  setTo(event.target.value);
                }}
              />
            </Stack>
          )}
          <Button onClick={apply} color="inherit">
            Pretraga
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

AttributeSearchModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onApply: PropTypes.func
};

export default AttributeSearchModal;
