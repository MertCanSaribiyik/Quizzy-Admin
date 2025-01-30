import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerWidth: 260,
  mobileOpen: false,
  isClosing: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    handleDrawerClose: (state) => {
      state.isClosing = true;
      state.mobileOpen = false;
    },
    handleDrawerTransitionEnd: (state) => {
      state.isClosing = false;
    },
    handleDrawerToggle: (state) => {
      if (!state.isClosing) {
        state.mobileOpen = !state.mobileOpen;
      }
    },
  },
});

export const {
  handleDrawerClose,
  handleDrawerTransitionEnd,
  handleDrawerToggle,
} = drawerSlice.actions;

export default drawerSlice.reducer;
