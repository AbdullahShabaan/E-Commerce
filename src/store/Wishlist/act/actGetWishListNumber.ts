import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils/axiosErrorHandler";
import axios from "axios";

const getWishListNumbers = createAsyncThunk(
  "wishlist/getWishListNumbers",
  async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const { AuthSlice } = getState() as RootState;

    try {
      const request = await axios.get(`/wishlist?userId=${AuthSlice.user.id}`);
      return request.data;
    } catch (e) {
      return rejectWithValue(
        axiosErrorHandler(e, "error while getting wish list numbers")
      );
    }
  }
);

export default getWishListNumbers;
