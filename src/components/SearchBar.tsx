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
    <div className="flex gap-2 mb-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Mixcloud…"
        className="flex-1 border rounded px-3 py-2"
      />
      <button onClick={handleSearch} className="px-4 py-2 rounded bg-blue-600 text-white">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
