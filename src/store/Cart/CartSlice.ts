import { createSlice } from "@reduxjs/toolkit";
import { getTotalQuanityInCart } from "@store/selectors";
import { TLoading } from "src/types/TLoading";
import { TProducts } from "src/types/TProducts";
import getProductsByItems from "./act/getProductsByItems";

interface ICartState {
  items: { [key: string]: number };
  productFullInfo: TProducts[];
  error: string | null;
  loading: TLoading;
}
const initialState: ICartState = {
  items: {},
  productFullInfo: [],
  error: null,
  loading: "idle",
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.items[action.payload]) {
        state.items[action.payload]++;
      } else {
        state.items[action.payload] = 1;
      }
    },
    removeFromCart: (state, action) => {
      if (state.items[action.payload]) {
        state.items[action.payload]--;
      }
    },
    removeProductFromCart: (state, action) => {
      if (state.items[action.payload]) {
        delete state.items[action.payload];
        state.productFullInfo = state.productFullInfo.filter(
          (product) => product.id !== action.payload
        );
      }
    },
    cleanUpCartProducts: (state) => {
      state.productFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productFullInfo = action.payload;
      state.error = null;
    });
    builder.addCase(getProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export { getTotalQuanityInCart };
export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  removeProductFromCart,
  cleanUpCartProducts,
} = cartSlice.actions;
