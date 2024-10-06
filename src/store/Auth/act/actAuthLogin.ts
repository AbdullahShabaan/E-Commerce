import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils/axiosErrorHandler";
import axios from "axios";

interface IFormData {
  email: string;
  password: string;
}
interface IResponse {
  accessToken: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
  };
}
const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (formData: IFormData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const req = await axios.post<IResponse>("/login", formData);
      return req.data;
    } catch (e) {
      return rejectWithValue(
        axiosErrorHandler(e, "error while creating auth login")
      );
    }
  }
);

export default authLogin;
