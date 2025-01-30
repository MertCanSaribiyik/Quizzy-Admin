import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import questionReducer from "./slices/questionSlice";
import drawerReducer from "./slices/drawerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    question: questionReducer,
    drawer: drawerReducer,
  },
});
