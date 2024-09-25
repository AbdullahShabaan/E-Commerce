import { useSelector } from "react-redux";
import Logo from "@assets/cart.svg?react";
import { getTotalQuanityInCart } from "@store/Cart/CartSlice";

import HeaderCounter from "@components/common/HeaderCounter/HeaderCounter";

const HeaderBasket = () => {
  const count = useSelector(getTotalQuanityInCart) as number;

  return (
    <HeaderCounter
      count={count}
      title="Cart"
      navigateTo="cart"
      icon={<Logo />}
    />
  );

  //   <div
  //     className="d-flex align-items-center gap-2"
  //     onClick={() => navigate("/cart")}
  //     style={{ cursor: "pointer" }}
  //   >
  //     <div className={basketContainer}>
  //       <Logo title="basket icon" style={{ width: "26px" }} />
  //       {!(count == 0) && <div className={quantityStyle}>{count}</div>}
  //     </div>
  //     <h6 className="m-0" style={{ fontSize: "14px" }}>
  //       Cart
  //     </h6>
  //   </div>
  // );
};

export default HeaderBasket;
