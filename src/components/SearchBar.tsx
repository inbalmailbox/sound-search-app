import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { performSearch, addRecent, loadRecent, clearResults } from "../store/searchSlice";

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(loadRecent());
  }, [dispatch]);

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;
    dispatch(clearResults());
    dispatch(performSearch({ query: q, offset: 0 }));
    dispatch(addRecent(q));
  };

  return (
    // In SearchBar.tsx, replace the input/button wrapper
<div className="flex gap-3 items-center">
  <div className="relative flex-1">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search Mixcloud…"
      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
    />
  </div>
  <button
    onClick={handleSearch}
    className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-medium shadow-card hover:bg-brand-700 transition"
  >
    Search
  </button>
</div>

  );
};

export default SearchBar;
