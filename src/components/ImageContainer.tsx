import React, { useMemo, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";

/** Build a valid Mixcloud widget feed URL from absolute url or path key */
const makeMixcloudFeed = (t?: { url?: string; key?: string }) => {
  if (!t) return "";
  const href =
    (t.url && (t.url.startsWith("http") ? t.url : `https://www.mixcloud.com${t.url}`)) ||
    (t.key ? `https://www.mixcloud.com${t.key}` : "");
  return href
    ? `https://www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(
        href
      )}&hide_cover=1&light=1`
    : "";
};

const PlayerSkeleton: React.FC = () => (
  <div className="w-full max-w-xl">
    <div className="w-full h-56 rounded-xl2 bg-slate-200 dark:bg-slate-700 animate-pulse mb-4" />
    <div className="h-6 w-3/5 rounded bg-slate-200 dark:bg-slate-700 animate-pulse mb-2" />
    <div className="h-4 w-2/5 rounded bg-slate-200 dark:bg-slate-700 animate-pulse mb-4" />
    <div className="h-[120px] w-full rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
  </div>
);

const Spinner: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="h-6 w-6 border-2 border-slate-300 dark:border-slate-500 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
  </div>
);

const ImageContainer: React.FC = () => {
  const selected = useAppSelector((s: RootState) => s.search.selected);
  const feedSrc = useMemo(() => makeMixcloudFeed(selected as any), [selected]);

  const [isLoading, setIsLoading] = useState(false);

  // When the selected track changes, show the loader until iframe onLoad fires
  useEffect(() => {
    setIsLoading(!!feedSrc);
  }, [feedSrc]);

  return (
    <div className="app-card p-5 min-h-[460px] flex flex-col items-center justify-center text-center relative">
      {!selected ? (
        <p className="muted">Click a tile to preview & play here.</p>
      ) : (
        <div className="w-full max-w-xl">
          {selected.pictures?.extra_large || selected.pictures?.medium ? (
            <img
              src={selected.pictures?.extra_large ?? selected.pictures?.medium!}
              alt={selected.name}
              className="w-full rounded-xl2 shadow-card mb-4"
              loading="lazy"
            />
          ) : null}

          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {selected.name}
          </h2>
          <p className="muted text-sm">{selected.user?.name}</p>

          <div className="mt-4 relative">
            {/* Skeleton while iframe bootstraps */}
            {isLoading && <PlayerSkeleton />}

            {feedSrc && (
              <iframe
                key={feedSrc} // ensures onLoad runs on every track change
                title="Mixcloud Player"
                width="100%"
                height="120"
                src={feedSrc}
                frameBorder={0}
                className={`rounded-xl w-full transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                allow="autoplay; encrypted-media; clipboard-write; fullscreen; picture-in-picture"
                // When iframe is ready, fade it in and hide skeleton
                onLoad={() => setIsLoading(false)}
              />
            )}

            {/* Small spinner overlay for extra feedback while loading */}
            {isLoading && <Spinner />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageContainer;
