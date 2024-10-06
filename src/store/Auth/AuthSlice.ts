import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "src/types/TLoading";
import authRegister from "./act/actAuthRegister";
import isString from "src/types/isString";
import authLogin from "./act/actAuthLogin";

interface IAuthState {
  accessToken: string | null;
  loading: TLoading;
  error: string | null;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
  };
}
const initialState: IAuthState = {
  loading: "idle",
  error: null,
  accessToken: null,
  user: {
    email: "",
    firstName: "",
    lastName: "",
    id: "",
  },
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetRegisterAndLoginErrors: (state) => {
      state.error = null;
      state.loading = "idle";
    },
    logOut: (state) => {
      state.accessToken = null;
      state.user = {
        email: "",
        firstName: "",
        lastName: "",
        id: "",
      };
    },
  },
  extraReducers: (builder) => {
    // Register
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
    // Login
    builder.addCase(authLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export default AuthSlice.reducer;
export const { resetRegisterAndLoginErrors, logOut } = AuthSlice.actions;
