// src/api/soundApi.ts

export interface Track {
  name: string;
  /** Absolute URL, e.g. https://www.mixcloud.com/user/mix/ */
  url?: string;
  /** Path-only key, e.g. /user/mix/ (useful fallback for embeds) */
  key?: string;
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
 * Fetch Mixcloud cloudcasts (6 per page) with offset pagination.
 */
export async function fetchTracks(
  query: string,
  offset: number = 0,
  limit: number = 6
): Promise<Track[]> {
  if (!query) return [];

  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&type=cloudcast&limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch Mixcloud tracks");
  }

  const data = await res.json();
  const items: any[] = Array.isArray(data?.data) ? data.data : [];

  return items.map((item) => {
    const pics = item?.pictures ?? {};
    return {
      name: item?.name ?? "Untitled",
      url: item?.url || undefined, // absolute URL if present
      key: item?.key || undefined, // path-only fallback
      pictures: {
        medium: pics?.medium,
        large: pics?.large,
        extra_large: pics?.extra_large,
      },
      user: {
        name: item?.user?.name ?? "Unknown",
        url: item?.user?.url ?? "",
      },
    } as Track;
  });
}
