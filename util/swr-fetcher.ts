export class FetchError extends Error {
  status: number;
}

/**
 * A simple wrapper that makes the fetch API work with SWR.
 */
export const fetcher = async (
  url: string,
  format: "json" | "text" = "json"
) => {
  const res = await fetch(url);
  const content = format === "json" ? await res.json() : await res.text();

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new FetchError(content.error);
    // Attach extra info to the error object.
    error.status = res.status;
    throw error;
  }

  return content;
};
