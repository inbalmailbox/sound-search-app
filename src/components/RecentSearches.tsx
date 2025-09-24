import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearResults, performSearch, setQuery } from "../store/searchSlice";
import type { RootState } from "../store/store";

const RecentSearches: React.FC = () => {
  const recent = useAppSelector((s: RootState) => s.search.recent);
  const dispatch = useAppDispatch();

  const runSearch = (term: string) => {
    const q = term.trim();
    if (!q) return;
    // keep the query in state (useful if you show it in the input)
    dispatch(setQuery(q));
    // reset results/offset and fetch page 1 (offset 0)
    dispatch(clearResults());
    dispatch(performSearch({ query: q, offset: 0 }));
  };

  if (!recent.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Searches</h2>
      <ul className="space-y-3">
        {recent.map((term, idx) => (
          <li key={`${term}-${idx}`}>
            <button
              type="button"
              onClick={() => runSearch(term)}
              className="text-blue-600 hover:text-blue-700 hover:underline focus:outline-none focus:ring"
            >
              {term}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
