import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "src/types/TLoading";
import TOrder from "src/types/TOrders";
import makeOrder from "./act/actMakeOrder";
import isString from "src/types/isString";

interface IOrder {
  ordersList: TOrder[];
  loading: TLoading;
  error: string | null;
}
const initialState: IOrder = { ordersList: [], loading: "idle", error: null };
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(makeOrder.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(makeOrder.rejected, (state, action) => {
        if (isString(action.payload)) {
          state.error = action.payload;
        }
        state.loading = "failed";
      });
  },
});

export default ordersSlice.reducer;
