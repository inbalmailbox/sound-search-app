// src/components/TrackPage.tsx
import React from "react";
import { useParams } from "react-router-dom";

const TrackPage: React.FC = () => {
  const { id } = useParams(); // id will be encoded Mixcloud track URL
  const decodedUrl = decodeURIComponent(id || "");

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Now Playing</h2>

      <iframe
        width="100%"
        height="120"
        allow="autoplay; encrypted-media; clipboard-write; fullscreen; picture-in-picture"
        src={`https://www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(
          decodedUrl
        )}&hide_cover=1&light=1`}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default TrackPage;
