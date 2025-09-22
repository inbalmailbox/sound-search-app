import React from "react";
import { useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";

const ImageContainer: React.FC = () => {
  const selected = useAppSelector((s: RootState) => s.search.selected);

  if (!selected) {
    return <div className="text-gray-500">Click a result to preview & play here.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      {selected.pictures?.extra_large || selected.pictures?.medium ? (
        <img
          src={selected.pictures?.extra_large ?? selected.pictures?.medium!}
          alt={selected.name}
          className="w-full max-w-md rounded shadow mb-4"
        />
      ) : null}

      {/* Mixcloud embed (plays on click as per exam) */}
      <iframe
        title="Mixcloud Player"
        width="100%"
        height="120"
        src={`https://www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(
          `https://www.mixcloud.com${selected.url}`
        )}&hide_cover=1&light=1`}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default ImageContainer;
