import useSWR from "swr";
import { FetchError, fetcher } from "../util/swr-fetcher";

/** Fetches and returns a list of all available export formats */
export const useExportPreview = (format?: string) => {
  return useSWR<string, FetchError>(
    `/api/colorTokens/export/${format ?? ""}`,
    (url) => fetcher(url, "text")
  );
};
