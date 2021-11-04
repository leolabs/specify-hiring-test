export class FetchError extends Error {
  info: string;
  status: number;
}

/**
 * A simple wrapper that makes the fetch API work with SWR.
 */
export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const content = await res.json();

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
