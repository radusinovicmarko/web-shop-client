/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import PropTypes from "prop-types";
import categoryService from "../services/category.service";
import { Button, Divider, Typography } from "@mui/material";
import CategoriesTreeView from "./CategoriesTreeView";
import { Stack } from "@mui/system";

const CategoryFilter = (props) => {
  const { onApply } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const apply = () => {
    onApply(categoryId);
    handleClose();
    setCategoryId(null);
  };

  useEffect(() => {
    categoryService
      .getAll()
      .then((res) => setCategories(res.data))
      .catch(() => console.log("err"));
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Filtrirajte">
          <IconButton
            sx={{ mt: 1 }}
            onClick={handleClick}
            aria-controls={open ? "filterMenu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <FilterAltOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="filterMenu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&:before": {
              content: "\"\"",
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem>
          <Typography variant="h6">
            Kategorije
          </Typography>
        </MenuItem>
        <MenuItem>
          <CategoriesTreeView onItemClick={(category) => {
            setCategoryId(category.id);
            setCategoryName(category.name);
          }} categories={categories} multiple={false} />
        </MenuItem>
        <Divider />
        <MenuItem>
        <Stack rowGap={1} >
          <Typography variant="body1">Izabrana kategorija:</Typography>
          <Typography variant="body1">{categoryName}</Typography>
          </Stack>
        </MenuItem>
        <Divider />
        <MenuItem onClick={apply}>
          <Button color="inherit">
            Filtrirajte
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

CategoryFilter.propTypes = {
  onApply: PropTypes.func
};

export default CategoryFilter;
