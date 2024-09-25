import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import Logo from "@assets/cart.svg?react";
import { getTotalQuanityInCart } from "@store/Cart/CartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderBasket = () => {
  const navigate = useNavigate();
  const { basketContainer, basketQuantity, pumpCartQuantity } = styles;
  const count = useSelector(getTotalQuanityInCart) as number;
  const [isAnimate, setIsAnimate] = useState(false);
  const quantityStyle = `${basketQuantity} ${
    isAnimate ? pumpCartQuantity : ""
  }`;

  useEffect(() => {
    if (count == 0) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => setIsAnimate(false), 300);

    return () => clearTimeout(debounce);
  }, [count]);
  return (
    <div
      className="d-flex align-items-center gap-2"
      onClick={() => navigate("/cart")}
      style={{ cursor: "pointer" }}
    >
      <div className={basketContainer}>
        <Logo title="basket icon" style={{ width: "26px" }} />
        {!(count == 0) && <div className={quantityStyle}>{count}</div>}
      </div>
      <h6 className="m-0" style={{ fontSize: "14px" }}>
        Cart
      </h6>
    </div>
  );
};

export default HeaderBasket;
