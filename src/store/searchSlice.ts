// src/store/searchSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchTracks } from "../api/soundApi";
import type { Track } from "../api/soundApi"; 

export interface SearchState {
  query: string;
  offset: number;
  results: Track[];
  status: "idle" | "loading" | "failed";
  recent: string[];
  selected: Track | null;
}

const initialState: SearchState = {
  query: "",
  offset: 0,
  results: [],
  status: "idle",
  recent: [],
  selected: null,
};

// ✅ Mixcloud search: 6 results at a time via offset
export const performSearch = createAsyncThunk(
  "search/performSearch",
  async ({ query, offset }: { query: string; offset: number }) => {
    const results = await fetchTracks(query, offset);
    return { results, query, offset };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // set query without fetching (optional)
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    // keep last 5 recent (unique)
    addRecent(state, action: PayloadAction<string>) {
      const q = action.payload.trim();
      if (!q) return;
      state.recent = [q, ...state.recent.filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(state.recent));
    },
    loadRecent(state) {
      const saved = localStorage.getItem("recentSearches");
      if (saved) state.recent = JSON.parse(saved);
    },
    clearResults(state) {
      state.results = [];
      state.offset = 0;
      state.selected = null;
    },
    setSelected(state, action: PayloadAction<Track | null>) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.status = "idle";
        state.query = action.payload.query;
        state.offset = action.payload.offset;
        // Replace the 6 results (exam requirement: show current page)
        state.results = action.payload.results;
      })
      .addCase(performSearch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  setQuery,
  addRecent,
  loadRecent,
  clearResults,
  setSelected,
} = searchSlice.actions;

export default searchSlice.reducer;
