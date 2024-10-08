import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils/axiosErrorHandler";
import axios from "axios";

const makeOrder = createAsyncThunk(
  "orders/makeOrder",
  async (totalPrice: number, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const { AuthSlice, CartSlice } = getState() as RootState;
    try {
      const req = await axios.post("/orders", {
        userId: AuthSlice.user.id,
        items: CartSlice.productFullInfo,
        totalPrice,
      });

      return req.data;
    } catch (e) {
      return rejectWithValue(axiosErrorHandler(e, "error while make order"));
    }
  }
);

export default makeOrder;
