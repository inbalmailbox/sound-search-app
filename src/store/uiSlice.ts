import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  theme: "light" | "dark";
  viewMode: "list" | "tile";
}

const initialState: UiState = {
  theme: "light",
  viewMode: "list",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setViewMode: (state, action: PayloadAction<"list" | "tile">) => {
      state.viewMode = action.payload;
    },
  },
});

export const { toggleTheme, setViewMode } = uiSlice.actions;
export default uiSlice.reducer;
