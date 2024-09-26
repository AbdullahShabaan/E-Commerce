import { AppDispatch, RootState } from "@store/store";
import getWishList from "@store/Wishlist/act/actGetWishList";
import { cleanUpWishlistProducts } from "@store/Wishlist/WishListSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useWishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsFullInfo, error, loading } = useSelector(
    (state: RootState) => state.WishListSlice
  );
  const selector = useSelector((state: RootState) => state.CartSlice.items);
  useEffect(() => {
    const promise = dispatch(getWishList());

    return () => {
      dispatch(cleanUpWishlistProducts());
      promise.abort();
    };
  }, [dispatch]);

  const fullDataInfo = productsFullInfo.map((d) => ({
    ...d,
    quantity: selector[d.id] ?? 0,
    isLiked: true,
  }));
  return { fullDataInfo, loading, error };
};
