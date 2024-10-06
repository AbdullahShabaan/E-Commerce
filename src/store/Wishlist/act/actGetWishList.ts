import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils/axiosErrorHandler";
import axios from "axios";
import { TProducts } from "src/types/TProducts";

const getWishList = createAsyncThunk(
  "wishlist/getWishList",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal, getState } = thunkAPI;
    const { AuthSlice } = getState() as RootState;

    try {
      const wishListValues = await axios.get<
        { productId: number; id: number; userId: number }[]
      >(`/wishlist?userId=${AuthSlice.user.id}`);
      if (!wishListValues.data.length) {
        return fulfillWithValue([]);
      }
      const concatenatedWishListValues = wishListValues.data
        .map((p) => `id=${p.productId}`)
        .join("&");

      const getProductsByIds = await axios.get<TProducts[]>(
        `/products?${concatenatedWishListValues}`,
        { signal }
      );
      return getProductsByIds.data;
    } catch (e) {
      return rejectWithValue(
        axiosErrorHandler(e, "An error occurred while fetching get wishlist")
      );
    }
  }
);

export default getWishList;
