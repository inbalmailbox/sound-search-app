import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { performSearch, addRecent } from "../store/searchSlice";
import type { RootState } from "../store/store";

const RecentSearches: React.FC = () => {
  const dispatch = useAppDispatch();
  const recent = useAppSelector((state: RootState) => state.search.recent);

  const handleClick = (q: string) => {
    dispatch(performSearch({ query: q, offset: 0 }));
    dispatch(addRecent(q));
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Recent Searches</h2>
      <ul className="space-y-2">
        {recent.map((item, idx) => (
          <li
            key={idx}
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => handleClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
