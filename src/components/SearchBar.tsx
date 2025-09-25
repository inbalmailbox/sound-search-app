import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";
import { performSearch, addRecent } from "../store/searchSlice";

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { results, status } = useAppSelector((s: RootState) => s.search);
  const [query, setQuery] = useState("");

  const isLoading = status === "loading";
  const showNext = results.length > 0;

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;
    dispatch(performSearch({ query: q, offset: 0 }));
    dispatch(addRecent(q));
  };

  const handleNext = () => {
    const q = query.trim();
    if (!q) return;
    dispatch(performSearch({ query: q, offset: 6 }));
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg opacity-50">
            🔎
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Mixcloud…"
            className="app-input h-14 pl-10 pr-4 w-full"
            aria-label="Search query"
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="btn-brand mt-4"
          disabled={isLoading}
        >
          Search
        </button>
      </div>

      {showNext && (
        <div className="mt-4">
          <button
            type="button"
            onClick={handleNext}
            className="btn-outline-brand mt-4"
            disabled={isLoading}
          >
            Next 6
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
