import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils/axiosErrorHandler";
import axios from "axios";
import { TProducts } from "src/types/TProducts";

const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (productId: number, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const request = await axios.get<TProducts[]>(
        `/products?id=${productId}`,
        {
          signal,
        }
      );

      return request.data[0] as TProducts;
    } catch (e) {
      return rejectWithValue(
        axiosErrorHandler(e, "error while get product details")
      );
    }
  }
);
export default getProductDetails;
