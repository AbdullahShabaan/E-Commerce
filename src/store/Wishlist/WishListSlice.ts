import { createSlice } from "@reduxjs/toolkit";
import wishListToggle from "./act/actWishListToggle";
import { TProducts } from "src/types/TProducts";
import { TLoading } from "src/types/TLoading";
import getWishList from "./act/actGetWishList";

interface IWishListState {
  itemsId: number[];
  productsFullInfo: TProducts[];
  error: null | string;
  loading: TLoading;
}
const initialState: IWishListState = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: "idle",
};
const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // like & dislike
    builder.addCase(wishListToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(wishListToggle.fulfilled, (state, action) => {
      if (action.payload.type == "add") {
        state.itemsId.push(action.payload.productId);
      } else {
        state.itemsId = state.itemsId.filter(
          (item) => item != action.payload.productId
        );
        state.productsFullInfo = state.productsFullInfo.filter(
          (item) => item.id != action.payload.productId
        );
      }
    });
    builder.addCase(wishListToggle.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    // get user likes
    builder.addCase(getWishList.pending, (state) => {
      state.error = null;
      state.loading = "pending";
    });
    builder.addCase(getWishList.fulfilled, (state, action) => {
      state.error = null;
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(getWishList.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = "failed";
    });
  },
});

export default wishListSlice.reducer;
