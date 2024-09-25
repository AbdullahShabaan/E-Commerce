import { useEffect } from "react";
import { useParams } from "react-router-dom";
import getProductsByCatPrefix from "@store/Products/act/actGetProductsByCatPrefix";
import { productsCleanUp } from "@store/Products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
export const useProducts = () => {
  const selector = useSelector((state: RootState) => state.CartSlice.items);
  const wishlistItems = useSelector(
    (state: RootState) => state.WishListSlice.itemsId || []
  );

  const { prefix } = useParams();
  const { data, error, loading } = useSelector(
    (state: RootState) => state.productsSlice
  );
  const fullDataInfo = data.map((d) => ({
    ...d,
    quantity: selector[d.id] ?? 0,
    isLiked: wishlistItems.includes(d.id),
  }));
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const cat = prefix as string;
    dispatch(getProductsByCatPrefix(cat));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  const catTitle = prefix
    ? prefix[0].toLocaleUpperCase() + prefix.slice(1)
    : "";
  return { catTitle, fullDataInfo, error, loading };
};
