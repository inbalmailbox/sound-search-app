import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";
import { performSearch, addRecent } from "../store/searchSlice";

const PAGE_SIZE = 6;

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { results, status, query: storeQuery, offset } = useAppSelector(
    (s: RootState) => s.search
  );

  const [query, setQuery] = useState("");
  const isLoading = status === "loading";

  const showNext =
    !!storeQuery && Array.isArray(results) && results.length > 0 && !isLoading;

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    dispatch(performSearch({ query: q.trim(), offset: 0 }));
    dispatch(addRecent(q.trim()));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    handleSearch(query);
  };

  const handleNext = () => {
    const q = (storeQuery || query).trim();
    if (!q) return;
    const nextOffset = (offset ?? 0) + PAGE_SIZE;
    dispatch(performSearch({ query: q, offset: nextOffset }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg opacity-50">
            🔎
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Mixcloud…"
            className="app-input h-10 pl-10 pr-4 w-full"
            aria-label="Search query"
          />
        </div>

        <button
          type="submit"
          className="btn-brand h-10"
          disabled={isLoading}
        >
          Search
        </button>
      </form>

      {showNext && (
        <div className="mt-4">
          <button
            type="button"
            onClick={handleNext}
            className="btn-outline-brand h-12"
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
