import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TCategories } from "src/types/TCategories";

const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const request = await axios.get<TCategories[]>(
        "http://localhost:5005/categories"
      );
      return request.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue("An error occurred while fetching categories");
      }
    }
  }
);

export default getCategories;
