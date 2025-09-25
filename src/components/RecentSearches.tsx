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
      <h2 className="panel-title mb-6">Recent Searches</h2>
      <ul className="space-y-4">
        {recent.map((term, idx) => (
          <li key={`${term}-${idx}`}>
            <button
              type="button"
              onClick={() => runSearch(term)}
               className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium
                   bg-brand-100 text-brand-700 hover:bg-brand-200
                   dark:bg-brand-900/40 dark:text-brand-300 dark:hover:bg-brand-800/60
                   transition-colors"
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
