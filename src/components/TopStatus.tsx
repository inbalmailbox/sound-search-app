import React from "react";
import { useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";

const REPO_URL = "https://github.com/inbalmailbox/sound-search-app"; 

const TopStatus: React.FC = () => {
  const { results, query } = useAppSelector((s: RootState) => s.search);

  return (
    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur border-b border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-5 h-12 flex items-center justify-between">
        {/* Left — status */}
        <div className="flex items-center gap-3">
          <span className="chip">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            {results.length} results
          </span>
          {query ? (
            <span className="chip">
              <span className="opacity-70">query:</span> {query}
            </span>
          ) : (
            <span className="chip">ready</span>
          )}
          <span className="chip bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
            Beta
          </span>
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-2">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="
              inline-flex items-center gap-2 rounded-xl px-3 py-2 transition-colors
              bg-brand-50 text-brand-700 hover:bg-brand-100
              dark:bg-white/10 dark:text-white dark:hover:bg-white/20
            "
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path
                fillRule="evenodd"
                d="M12 .5a12 12 0 0 0-3.793 23.396c.6.11.82-.26.82-.58v-2.03c-3.338.73-4.04-1.61-4.04-1.61-.546-1.39-1.335-1.76-1.335-1.76-1.09-.74.082-.725.082-.725 1.206.09 1.84 1.24 1.84 1.24 1.07 1.83 2.807 1.3 3.49.99.11-.79.42-1.3.76-1.6-2.665-.3-5.466-1.33-5.466-5.9 0-1.3.47-2.36 1.24-3.19-.12-.31-.54-1.56.12-3.26 0 0 1.01-.32 3.31 1.23a11.5 11.5 0 0 1 6.02 0c2.3-1.55 3.31-1.23 3.31-1.23.66 1.7.24 2.95.12 3.26.77.83 1.24 1.89 1.24 3.19 0 4.59-2.8 5.6-5.48 5.89.43.36.81 1.08.81 2.17v3.22c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopStatus;
