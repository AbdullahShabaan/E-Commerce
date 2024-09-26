import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils/axiosErrorHandler";
import axios from "axios";
import { TProducts } from "src/types/TProducts";

const getProductsByCatPrefix = createAsyncThunk(
  "products/getProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const request = await axios.get<TProducts[]>(
        `/products?cat_prefix=${prefix}`,
        { signal }
      );
      return request.data;
    } catch (e) {
      return rejectWithValue(
        axiosErrorHandler(e, "error while get products by prefix : " + prefix)
      );
    }
  }
);
export default getProductsByCatPrefix;
