import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils/axiosErrorHandler";
import axios from "axios";

interface IDataType {
  data: {
    accessToken: string;
    user: {
      email: string;
      firstName: string;
      lastName: string;
      id: string;
    };
  };
}
interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (formData: IFormData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const req = await axios.post<IDataType>("/register", formData);
      return req.data;
    } catch (e) {
      return rejectWithValue(axiosErrorHandler(e, "error while registering"));
    }
  }
);

export default authRegister;
