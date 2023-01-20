import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ProductCard = (props) => {
  const { product } = props;
  const navigate = useNavigate();

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
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Cijena: {new Intl.NumberFormat("ba", { style: "currency", currency: "BAM" }).format(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object
};

export default ProductCard;
