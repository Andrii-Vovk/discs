import { DiscogsListing, DiscogsRelease } from "@/types/discogs";
import { toast } from "sonner";

const BASE_API = "https://api.discogs.com";

const apiRoutes = {
  search: (query?: string, page: number = 1) =>
    `${BASE_API}/database/search?${query ? `q=${query}&` : ""}type=release&format=vinyl&per_page=100&page=${page}`,
};

const handleError = (err: any) => {
  toast.error(err?.message || "Something went wrong");
};

export const discFetch = async (url: string, options: RequestInit = {}) =>
  fetch(url, {
    ...options,
    headers: {
      "User-Agent": "DiscsComparisonApp/1.0",
      Authorization: `Discogs key=${process.env.NEXT_PUBLIC_DISCOGS_KEY}, secret=${process.env.NEXT_PUBLIC_DISCOGS_SECRET}`,
      ...options.headers,
    },
  });

export const discApi = {
  listDiscs: async (query?: string, page: number = 1) => {
    try {
      const response = await discFetch(apiRoutes.search(query, page)).then((r) => r.json());

      const filteredResults = response.results.filter((r: any) => !!r.title);

      return {
        pagination: response.pagination,
        results: filteredResults,
      } as DiscogsListing;
    } catch (e) {
      handleError(e);
    }

    return null;
  },

  getRecordById: async (id: string) => {
    try {
      const response = await discFetch(`${BASE_API}/releases/${id}?curr=USD`).then((r) => r.json());

      return response as DiscogsRelease;
    } catch (e) {
      handleError(e);
    }

    return null;
  },
};

export default apiRoutes;
