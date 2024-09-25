import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProducts } from "src/types/TProducts";

const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const request = await axios.get<TProducts[]>(`/products`);
      return request.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue("error while get all products");
      }
    }
  }
);
export default getAllProducts;
