import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils/axiosErrorHandler";
import axios from "axios";
import { TProducts } from "src/types/TProducts";

const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const request = await axios.get<TProducts[]>(`/products`, { signal });
      return request.data;
    } catch (e) {
      return rejectWithValue(
        axiosErrorHandler(e, "error while get all products")
      );
    }
  }
);
export default getAllProducts;
