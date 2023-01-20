/* eslint-disable react/no-children-prop */
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import categoryService from "../services/category.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const AttributeSearchModal = (props) => {
  const { onApply, onClose, open } = props;
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    categoryService
      .getAll()
      .then((res) => setCategories(res.data))
      .catch(() => console.log("err"));
  }, []);

  const getTreeItemsFromData = (treeItems) => {
    return treeItems.map((treeItemData) => {
      let children;
      if (treeItemData.subcategories && treeItemData.subcategories.length > 0) {
        children = getTreeItemsFromData(treeItemData.subcategories);
      }
      if (treeItemData.route) {
        return (
          <TreeItem
            key={treeItemData.id}
            nodeId={`${treeItemData.id}`}
            label={treeItemData.name}
            children={children}
            onClick={() => setCategoryId(treeItemData.id)}
          />
        );
      }
      return (
        <TreeItem
          key={treeItemData.id}
          nodeId={`${treeItemData.id}`}
          label={treeItemData.name}
          children={children}
          onClick={() => setCategoryId(treeItemData.id)}
        />
      );
    });
  };

  return (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">
            Kategorije
          </Typography>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            // sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
          >
            {getTreeItemsFromData(categories)}
          </TreeView>
          <Button onClick={() => onApply(categoryId)}>Pretraga</Button>
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
