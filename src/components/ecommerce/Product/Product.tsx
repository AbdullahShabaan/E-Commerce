import { memo, useEffect, useState } from "react";
import { TProducts } from "src/types/TProducts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import { addToCart } from "@store/Cart/CartSlice";
import toast from "react-hot-toast";
import wishListToggle from "@store/Wishlist/act/actWishListToggle";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
const { product, productImg, discount, stars, like } = styles;

const Product = memo(
  ({ id, img, price, title, max, quantity, isLiked }: TProducts) => {
    const dispatch = useDispatch<AppDispatch>();
    const { accessToken } = useSelector((state: RootState) => state.AuthSlice);
    const [isDisabled, setIsDisabled] = useState(false);
    const quantityRemain = max - (quantity ?? 0);
    const reachMax = quantityRemain <= 0;
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
      if (!isDisabled) {
        return;
      }
      const debounce = setTimeout(() => {
        setIsDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsDisabled(true);
      toast.success("Added to cart successfully");
    };

    const wishlistToggleHandler = () => {
      if (likeLoading) {
        return;
      }
      setLikeLoading(true);
      if (accessToken) {
        dispatch(wishListToggle(id))
          .unwrap()
          .then(() => setLikeLoading(false))
          .catch(() => setLikeLoading(false));
      } else {
        toast.error("Please login to add to wishlist");
      }
    };

    return (
      <div className={`${product} mt-4`}>
        <div className={productImg}>
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

          <div className="eye position-absolute">
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
          <img src={img} alt={title} />
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
