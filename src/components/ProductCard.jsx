import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useSelector } from "react-redux";
import { Stack } from "@mui/system";
import { DeleteOutline } from "@mui/icons-material";

const ProductCard = (props) => {
  const { product, deletable, onDelete } = props;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const deleteProduct = (event) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/proizvodi/${product.id}`)}>
        <CardMedia
          component="img"
          height="150"
          image={product.pictures[0] ? product.pictures[0].pictureUrl : ""}
          alt=""
        />
        <CardContent sx={{ alignItems: "center" }}>
          <Stack direction="row" columnGap={1}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ mt: 1 }}
            >
              {product.title}
            </Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            Cijena:{" "}
            {new Intl.NumberFormat("ba", {
              style: "currency",
              currency: "BAM"
            }).format(product.price)}
          </Typography>
          {user?.id === product.seller.id && deletable && (
            <Typography variant="body1" color="text.secondary">
              Status:{" "}
              {product.status === "Active"
                ? "Aktivan"
                : product.status === "Sold"
                  ? "Prodan"
                  : "Obrisan"}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {user?.id === product.seller.id &&
        deletable &&
        product.status === "Active" && (
          <CardActions>
            <Button variant="text" color="inherit" startIcon={<DeleteOutline />} onClick={deleteProduct}>
              {"Obrišite"}
            </Button>
          </CardActions>
      )}
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  deletable: PropTypes.bool,
  onDelete: PropTypes.func
};

export default ProductCard;
