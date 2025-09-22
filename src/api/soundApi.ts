// src/api/soundApi.ts

export interface Track {
  name: string;      // cloudcast title
  url: string;       // feed URL path (e.g. "/user/mix-name/")
  pictures?: {
    medium?: string;
    large?: string;
    extra_large?: string;
  };
  user: {
    name: string;
    url: string;
  };
}

const BASE_URL = "https://api.mixcloud.com/search/";

/**
 * Fetch Mixcloud cloudcasts (6 per page) with pagination via offset
 */
export async function fetchTracks(query: string, offset: number = 0, limit: number = 6): Promise<Track[]> {
  if (!query) return [];
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&type=cloudcast&limit=${limit}&offset=${offset}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch Mixcloud tracks");

  const data = await res.json();
  // Normalize
  return (data?.data ?? []).map((item: any) => ({
    name: item?.name ?? "Untitled",
    url: item?.url ?? "",
    pictures: item?.pictures ?? {},
    user: {
      name: item?.user?.name ?? "Unknown",
      url: item?.user?.url ?? "",
    },
  })) as Track[];
}
