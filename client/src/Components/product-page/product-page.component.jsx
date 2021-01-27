import React from "react";
import "./product-page.styles.scss";

import { useParams } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";

import { useDispatch, useSelector } from "react-redux";
import { selectCollectionItem } from "../../redux/shop/shop.selectors";
import { addItem } from "../../redux/cart/cart.action";
import NotFoundPage from "../../Pages/not-found-page/not-found-page.component";

const ProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const item = useSelector(selectCollectionItem(params));
  if (!item) {
    return <NotFoundPage />;
  }
  const { name, price, imageUrl } = item;
  return (
    <div className="product-page-container">
      <img src={imageUrl} alt="product" />
      <div className="product-info">
        <h1 className="product-name">{name}</h1>
        <h3 className="product-description">Description</h3>
        <p>
          Ullamco ex officia sunt nisi dolor tempor anim in est consectetur
          pariatur est dolor. Ad dolore nulla exercitation fugiat. Esse tempor
          enim est tempor commodo nostrud duis. Culpa magna veniam elit proident
          enim tempor ut consequat. Eu laboris qui proident deserunt quis.
        </p>
        <h3 className="product-price">{price}$</h3>
        <CustomButton onClick={() => dispatch(addItem(item))}>
          Add To Cart{" "}
        </CustomButton>
      </div>
    </div>
  );
};

export default ProductPage;
