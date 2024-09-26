import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils/axiosErrorHandler";
import axios from "axios";
import { TCategories } from "src/types/TCategories";

const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const request = await axios.get<TCategories[]>(
        "http://localhost:5005/categories",
        {
          signal,
        }
      );
      return request.data;
    } catch (e) {
      return rejectWithValue(
        axiosErrorHandler(e, "An error occurred while fetching categories")
      );
    }
  }
);

export default getCategories;
