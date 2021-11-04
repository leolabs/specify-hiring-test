import useSWR from "swr";
import { FormatList } from "../pages/api/colorTokens/export/formats";
import { FetchError, fetcher } from "../util/swr-fetcher";

/** Fetches and returns a list of all available export formats */
export const useExportFormats = () => {
  return useSWR<FormatList, FetchError>(
    "/api/colorTokens/export/formats",
    fetcher
  );
};
