import { createSlice } from "@reduxjs/toolkit";
import getCategories from "./act/getCategories";
import { TCategories } from "src/types/TCategories";
import { TLoading } from "src/types/TLoading";

interface ICategoriesState {
  data: TCategories[];
  loading: TLoading;
  error: string | null;
}
const initialState: ICategoriesState = {
  data: [],
  loading: "idle",
  error: null,
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    builder.addCase(getCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
  },
});

export default categoriesSlice.reducer;
export { getCategories };
