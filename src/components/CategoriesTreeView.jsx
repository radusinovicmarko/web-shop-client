import { TreeItem, TreeView } from "@mui/lab";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel } from "@mui/material";

const CategoriesTreeView = (props) => {
  const { onItemClick, categories, multiple } = props;

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
            label={multiple
              ? <FormControlLabel
                control={<Checkbox onClick={(event) => event.stopPropagation()} />}
                label={treeItemData.name}
              />
              : treeItemData.name
            }
            onClick={() => onItemClick(treeItemData)}
          >
            {children}
          </TreeItem>
        );
      }
      return (
        <TreeItem
          key={treeItemData.id}
          nodeId={`${treeItemData.id}`}
          label={multiple
            ? <FormControlLabel
              control={<Checkbox onClick={(event) => event.stopPropagation()} />}
              label={treeItemData.name}
            />
            : treeItemData.name
          }
          onClick={() => onItemClick(treeItemData)}
        >
          {children}
        </TreeItem>
      );
    });
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {getTreeItemsFromData(categories)}
    </TreeView>
  );
};

CategoriesTreeView.propTypes = {
  onItemClick: PropTypes.func,
  categories: PropTypes.array,
  multiple: PropTypes.bool
};

export default CategoriesTreeView;
