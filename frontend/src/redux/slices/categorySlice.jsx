import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../config";

const initialState = {
  categories: [],
  selectedCategory: {},
  isLoading: false,
  error: undefined,
  message: undefined,
};

const URL = `${config.baseUrl}/category`;

export const getAllCategories = createAsyncThunk(
  "getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(URL, {
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

export const createCategory = createAsyncThunk(
  "createCategory",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(URL, body, {
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

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategoryMessage: (state) => {
      state.message = undefined;
    },
  },
  extraReducers: (builder) => {
    //Get All Categories
    builder.addCase(getAllCategories.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    //Create Category
    builder.addCase(createCategory.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.isLoading = false;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { resetCategoryMessage } = categorySlice.actions;

export default categorySlice.reducer;
