import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { performSearch, setSelected } from '../store/searchSlice';
import type { RootState } from '../store/store';
import TileCard from './ui/TileCard';

const SearchResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const { results, query, offset, status } = useAppSelector((s: RootState) => s.search);

  const next = () => query && dispatch(performSearch({ query, offset: offset + 6 }));

  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((t, i) => (
          <li key={i}>
            <TileCard
              title={t.name}
              subtitle={t.user?.name ?? ''}
              img={t.pictures?.medium}
              accent={i % 3 === 0 ? 'sky' : i % 3 === 1 ? 'peach' : 'mint'}
              onClick={() => dispatch(setSelected(t))}
            />
          </li>
        ))}
      </ul>

      <div className="pt-1">
        <button
          onClick={next}
           className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-medium shadow-card hover:bg-brand-700 transition"
        >
          Next 6
        </button>
      </div>

      {status === 'loading' && <p className="text-slate-500 text-sm">Loading…</p>}
    </div>
  );
};

export default SearchResults;
