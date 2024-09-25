import { RootState } from "@store/store";
import WishListIcon from "@assets/wishlist.svg?react";
import { useSelector } from "react-redux";
import HeaderCounter from "@components/common/HeaderCounter/HeaderCounter";

const WishListHeader = () => {
  const count = useSelector(
    (state: RootState) => state.WishListSlice.itemsId.length
  );

  return (
    <HeaderCounter
      count={count}
      title="Wishlist"
      navigateTo="wishlist"
      icon={<WishListIcon />}
    />
  );
};

export default WishListHeader;
