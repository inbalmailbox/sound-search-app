import React, { useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";

/** Build a valid Mixcloud widget feed URL from either an absolute url or a path key */
const makeMixcloudFeed = (t?: { url?: string; key?: string }) => {
  if (!t) return "";

  // Prefer absolute URL; otherwise fallback to key/path
  const href =
    (t.url && (t.url.startsWith("http") ? t.url : `https://www.mixcloud.com${t.url}`)) ||
    (t.key ? `https://www.mixcloud.com${t.key}` : "");

  return href
    ? `https://www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(
        href
      )}&hide_cover=1&light=1`
    : "";
};

const ImageContainer: React.FC = () => {
  const selected = useAppSelector((s: RootState) => s.search.selected);

  // Memoize the iframe src so it only recomputes when the selected track changes
  const feedSrc = useMemo(() => makeMixcloudFeed(selected as any), [selected]);

  return (
    <div className="app-card p-5 min-h-[460px] flex flex-col items-center justify-center text-center">
      {!selected ? (
        <p className="text-slate-500">Click a tile to preview & play here.</p>
      ) : (
        <div className="w-full max-w-xl">
          {selected.pictures?.extra_large || selected.pictures?.medium ? (
            <img
              src={selected.pictures?.extra_large ?? selected.pictures?.medium!}
              alt={selected.name}
              className="w-full rounded-xl2 shadow-card mb-4"
            />
          ) : null}

          <h2 className="text-lg font-semibold">{selected.name}</h2>
          <p className="text-slate-500 text-sm">{selected.user?.name}</p>

          <div className="mt-4 w-full">
            {feedSrc ? (
             <iframe
                title="Mixcloud Player"
                width="100%"
                height="120"
                src={feedSrc}            // your computed URL
                frameBorder={0}
                className="rounded-xl w-full"
                // 👇 Important for Chrome
                allow="autoplay; encrypted-media; clipboard-write; fullscreen; picture-in-picture"
                />

            ) : (
              <p className="text-slate-500">This item can’t be embedded.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageContainer;
