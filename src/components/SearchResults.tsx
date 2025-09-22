import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { performSearch, setSelected } from "../store/searchSlice";
import type { RootState } from "../store/store";

const SearchResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const { results, query, offset, status } = useAppSelector((s: RootState) => s.search);

  const handleNext = () => {
    if (!query) return;
    dispatch(performSearch({ query, offset: offset + 6 }));
  };

  if (status === "loading" && results.length === 0) {
    return <div>Loading…</div>;
  }

  if (!results.length) {
    return <div className="text-gray-500">No results yet. Try searching.</div>;
  }

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {results.map((t, idx) => (
          <li
            key={idx}
            onClick={() => dispatch(setSelected(t))}
            className="cursor-pointer border rounded p-2 hover:shadow transition"
            title="Click to load in the center player"
          >
            {t.pictures?.medium && (
              <img
                src={t.pictures.medium}
                alt={t.name}
                className="w-full h-40 object-cover rounded"
              />
            )}
            <div className="mt-2 font-semibold">{t.name}</div>
            <div className="text-xs text-gray-500">{t.user?.name}</div>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Next 6
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
