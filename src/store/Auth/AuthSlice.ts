import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "src/types/TLoading";
import authRegister from "./act/actAuthRegister";
import isString from "src/types/isString";

interface IAuthState {
  loading: TLoading;
  error: string | null;
}
const initialState: IAuthState = { loading: "idle", error: null };
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(authRegister.fulfilled, (state) => {
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(authRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export default AuthSlice.reducer;
