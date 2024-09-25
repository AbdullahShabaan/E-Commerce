import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

export const getTotalQuanityInCart = createSelector(
  (state: RootState) => state.CartSlice.items,
  (items) => {
    const countCartItems = Object.values(items).reduce((prev, curr) => {
      return prev + curr;
    }, 0);

    return countCartItems;
  }
);
