import useSWR from "swr";
import { ColorTokenList } from "../pages/api/colorTokens";
import { fetcher, FetchError } from "../util/swr-fetcher";

/** Fetches and returns a list of all color tokens. */
export const useColorTokens = () => {
  return useSWR<ColorTokenList, FetchError>("/api/colorTokens", fetcher);
};
