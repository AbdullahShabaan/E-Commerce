import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProducts } from "src/types/TProducts";

const getWishList = createAsyncThunk(
  "wishlist/getWishList",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI;
    try {
      const wishListValues = await axios.get<
        { productId: number; id: number; userId: number }[]
      >("/wishlist?userId=1");
      if (!wishListValues.data.length) {
        return fulfillWithValue([]);
      }
      const concatenatedWishListValues = wishListValues.data
        .map((p) => `id=${p.productId}`)
        .join("&");

      const getProductsByIds = await axios.get<TProducts[]>(
        `/products?${concatenatedWishListValues}`
      );
      return getProductsByIds.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue("An error occurred while fetching get wishlist");
      }
    }
  }
);

export default getWishList;
