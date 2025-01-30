import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../config";

const initialState = {
  questions: [],
  selectedQuestions: [],
  message: undefined,
  isLoading: false,
  error: undefined,
};

const URL = `${config.baseUrl}/question`;

export const getAllQuestions = createAsyncThunk(
  "getAllQuestions",
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

export const getQuestionByCategory = createAsyncThunk(
  "getQuestionByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}/category?category_id=${categoryId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createQuestion = createAsyncThunk(
  "createQuestion",
  async (question, { rejectWithValue }) => {
    try {
      const response = await axios.post(URL, question, {
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

export const deleteQuestion = createAsyncThunk(
  "deleteQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${URL}/${questionId}`, {
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

export const questionSlice = createSlice({
  name: "questionSlice",
  initialState,
  reducers: {
    filteredQuestions: (state, action) => {
      state.questions = state.questions.filter(
        (item) =>
          item.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
      );
    },
    resetQuestionMessage: (state) => {
      state.message = undefined;
    },
  },
  extraReducers: (builder) => {
    //Get All Questions :
    builder.addCase(getAllQuestions.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(getAllQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getAllQuestions.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    //Get Questions By Category :
    builder.addCase(getQuestionByCategory.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(getQuestionByCategory.fulfilled, (state, action) => {
      state.questions = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getQuestionByCategory.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    //Create Question :
    builder.addCase(createQuestion.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.isLoading = false;
    });
    builder.addCase(createQuestion.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    //Delete Question :
    builder.addCase(deleteQuestion.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.isLoading = false;
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { filteredQuestions, resetQuestionMessage } =
  questionSlice.actions;

export default questionSlice.reducer;
