import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils/axiosErrorHandler";
import axios from "axios";
import { TProducts } from "src/types/TProducts";

const getProductsByItems = createAsyncThunk(
  "cart/getProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue, signal } = thunkAPI;
    const {
      CartSlice: { items },
    } = getState() as RootState;
    const productsId = Object.keys(items);

    if (productsId.length == 0) return fulfillWithValue([]);

    try {
      const productsIdConcat = productsId.map((id) => `id=${id}`).join("&");
      const request = await axios.get<TProducts[]>(
        `/products?${productsIdConcat}`,
        { signal }
      );

      return request.data;
    } catch (err) {
      return rejectWithValue(
        axiosErrorHandler(err, "error while get products in cart")
      );
    }
  }
);

export default getProductsByItems;
