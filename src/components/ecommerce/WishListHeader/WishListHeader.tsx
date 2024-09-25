import { RootState } from "@store/store";
import styles from "./styles.module.css";
import WishListIcon from "@assets/wishlist.svg?react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WishListHeader = () => {
  const navigate = useNavigate();
  const { basketContainer, basketQuantity, pumpWishlistQuantity, basketName } =
    styles;
  const count = useSelector(
    (state: RootState) => state.WishListSlice.itemsId.length
  );
  const [isAnimate, setIsAnimate] = useState(false);
  const quantityStyle = `${basketQuantity} ${
    isAnimate ? pumpWishlistQuantity : ""
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
      className="d-flex align-items-center gap-1"
      onClick={() => navigate("/wishlist")}
      style={{ cursor: "pointer" }}
    >
      <div className={basketContainer}>
        <WishListIcon title="wishList icon" style={{ width: "26px" }} />
        {!(count == 0) && <div className={quantityStyle}>{count}</div>}
      </div>
      <h6 className={`m-0 ${basketName}`} style={{ fontSize: "14px" }}>
        WishList
      </h6>
    </div>
  );
};

export default WishListHeader;
