import getProductsByItems from "@store/Cart/act/getProductsByItems";
import { cleanUpCartProducts } from "@store/Cart/CartSlice";
import { AppDispatch, RootState } from "@store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCart = () => {
  const { items } = useSelector((state: RootState) => state.CartSlice);
  const { accessToken } = useSelector((state: RootState) => state.AuthSlice);

  const itemsLength =
    Object.values(items).length > 0
      ? Object.values(items).reduce((prev, curr) => prev + curr)
      : 0;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const promise = dispatch(getProductsByItems());

    return () => {
      dispatch(cleanUpCartProducts());
      promise.abort();
    };
  }, [dispatch]);

  return { itemsLength, accessToken };
};
