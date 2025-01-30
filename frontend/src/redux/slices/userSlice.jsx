import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../config";

const initialState = {
  user: {},
  token: undefined,
  isLoading: false,
  error: undefined,
  message: undefined,
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.baseUrl}/user/register`,
        body
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${config.baseUrl}/user/login`, body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const currentUser = createAsyncThunk(
  "currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.baseUrl}/user/current`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserMessage: (state) => {
      state.message = undefined;
    },
  },
  extraReducers: (builder) => {
    //Register :
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //Login
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.accessToken;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.token = undefined;
      state.isLoading = false;
      state.error = action.payload;
    });

    //Current
    builder.addCase(currentUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(currentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetUserMessage } = userSlice.actions;

export default userSlice.reducer;
