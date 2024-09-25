import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProducts } from "src/types/TProducts";

const getProductsByCatPrefix = createAsyncThunk(
  "products/getProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const request = await axios.get<TProducts[]>(
        `/products?cat_prefix=${prefix}`
      );
      return request.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue(
          "error while get products by prefix : " + prefix
        );
      }
    }
  }
);
export default getProductsByCatPrefix;
