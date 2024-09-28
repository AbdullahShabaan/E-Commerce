import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "src/types/TLoading";
import { TProducts } from "src/types/TProducts";
import getProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import getAllProducts from "./act/actGetAllProducts";
import isString from "src/types/isString";

interface IState {
  data: TProducts[];
  loading: TLoading;
  error: string | null;
}
const initialState: IState = { data: [], loading: "idle", error: null };
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    // get all Products

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload.slice(0, 8);
      state.error = null;
    });
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { productsCleanUp } = productSlice.actions;
export default productSlice.reducer;
