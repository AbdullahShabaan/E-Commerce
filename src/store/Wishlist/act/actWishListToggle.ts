import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
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
    const { rejectWithValue, getState } = thunkAPI;
    const { AuthSlice } = getState() as RootState;

    try {
      const isItemExist = await axios.get<IWishlistRequest[]>(
        `/wishlist?userId=${AuthSlice.user.id}&productId=${productId}`
      );
      if (isItemExist.data.length > 0) {
        await axios.delete(`/wishlist/${isItemExist.data[0].id}`);
        return { type: "removed", productId };
      } else {
        await axios.post(`/wishlist`, {
          productId,
          userId: AuthSlice.user.id,
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
