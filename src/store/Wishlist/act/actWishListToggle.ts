import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils/axiosErrorHandler";
import axios from "axios";

interface IWishlistRequest {
  productId: number;
  userId: number;
  id: number;
}
const wishListToggle = createAsyncThunk(
  "wishlist/wishListToggle",
  async (productId: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const isItemExist = await axios.get<IWishlistRequest[]>(
        `/wishlist?userId=1&productId=${productId}`
      );
      if (isItemExist.data.length > 0) {
        await axios.delete(`/wishlist/${isItemExist.data[0].id}`);
        return { type: "removed", productId };
      } else {
        await axios.post(`/wishlist`, {
          productId,
          userId: 1, // replace with actual user id
        });
        return { type: "add", productId };
      }
    } catch (e) {
      return rejectWithValue(
        axiosErrorHandler(e, "An error occurred while toggling wishlist")
      );
    }
  }
);

export default wishListToggle;
