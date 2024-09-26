import { useEffect } from "react";
import {
  cleanUpCategories,
  getCategories,
} from "@store/Categories/categoriesSlice";
import { AppDispatch, RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";

export const useCategories = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.categoriesSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const promise = dispatch(getCategories());

    return () => {
      dispatch(cleanUpCategories());
      promise.abort();
    };
  }, [dispatch]);
  return { data, loading, error };
};
