import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";
import { TProducts } from "src/types/TProducts";

const getProductsByItems = createAsyncThunk(
  "cart/getProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue } = thunkAPI;
    const {
      CartSlice: { items },
    } = getState() as RootState;
    const productsId = Object.keys(items);

    if (productsId.length == 0) return fulfillWithValue([]);

    try {
      const productsIdConcat = productsId.map((id) => `id=${id}`).join("&");
      const request = await axios.get<TProducts[]>(
        `/products?${productsIdConcat}`
      );

      return request.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(
          "An error occurred while fetching products by items"
        );
      }
    }
  }
);

export default getProductsByItems;
