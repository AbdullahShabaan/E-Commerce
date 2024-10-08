import { memo, useEffect, useState } from "react";
import { TProducts } from "src/types/TProducts";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";

import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import useAddToCart from "@hooks/useAddToCart";
import useAddToWishList from "@hooks/useAddToWishList";

const { product, productImg, discount, stars, like, eye } = styles;

const Product = memo(
  ({ id, img, price, title, max, quantity, isLiked }: TProducts) => {
    const { accessToken } = useSelector((state: RootState) => state.AuthSlice);
    const [isDisabled, setIsDisabled] = useState(false);
    const quantityRemain = max - (quantity ?? 0);
    const reachMax = quantityRemain <= 0;
    const [likeLoading, setLikeLoading] = useState(false);
    const navigate = useNavigate();
    const addToCartHandler = useAddToCart({ id, setIsDisabled });
    const wishlistToggleHandler = useAddToWishList({
      accessToken,
      id,
      likeLoading,
      setLikeLoading,
    });
    useEffect(() => {
      if (!isDisabled) {
        return;
      }
      const debounce = setTimeout(() => {
        setIsDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isDisabled]);

    const goToDetailsHandler = () => {
      navigate(`/productDetails/${id}`);
    };

    return (
      <div className={`${product} mt-4 pe`}>
        <div className={`${productImg}`}>
          <div
            className={`position-absolute ${like}`}
            onClick={wishlistToggleHandler}
          >
            {likeLoading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              <>
                {isLiked ? (
                  <i className="fa-solid fa-heart text-danger"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </>
            )}
          </div>

          <div
            className={`${eye} position-absolute`}
            onClick={goToDetailsHandler}
          >
            <i className="fa-regular fa-eye"></i>
          </div>
          <p className={discount}>
            <i>-40%</i>
          </p>
          <a className="position-absolute w-100">
            <Button
              disabled={isDisabled || reachMax}
              className="addToCard w-100 bg-black btn-outline-dark py-1"
              onClick={addToCartHandler}
              variant="info"
              style={{ color: "white", borderRadius: "0" }}
            >
              {isDisabled ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Add to cart"
              )}
            </Button>
          </a>
          <img className="object-fit-contain" src={img} alt={title} />
        </div>
        <h2 title={title}>{title}</h2>
        <p style={{ fontSize: "13px" }}>
          {reachMax
            ? "You’ve reached the available quantity limit."
            : `You can select up to ${quantityRemain} items`}
        </p>
        <div className="d-flex gap-2">
          <h3>${price.toLocaleString()} </h3>
          <h3 className="text-decoration-line-through text-black-50">$5000</h3>
        </div>
        <div className={stars}>
          {[1, 2, 3, 4].map((_, index) => (
            <i key={index} className="fa-solid fa-star"></i>
          ))}
        </div>
      </div>
    );
  }
);

export default Product;
