import { RequestError } from "../http-errors";
import logger from "../logger";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<{ success: boolean; data?: T; error?: Error }> {
  const { timeout = 100000, headers: customHeaders = {}, body, ...restOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  let headers: HeadersInit = {};
    let processedBody = body;

    if (body instanceof FormData) {
    headers = { ...customHeaders }; // Biarkan browser yang atur Content-Type
    processedBody = body;
    } else if (body && typeof body === "object") {
    headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...customHeaders,
    };
    processedBody = JSON.stringify(body);
    } else {
    headers = { ...customHeaders };
    }


  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
    body: body instanceof FormData ? body : JSON.stringify(body),
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(response.status, `HTTP error: ${response.status}`);
    }

    const resBody = await response.json();
    console.log("📥 [fetchHandler] Raw API Response:", resBody);

    if (resBody.success) {
      return { success: true, data: resBody.data };
    }

    return { success: false, error: new Error("API responded with success: false") };
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");

    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    } else {
      logger.error(`Error fetching ${url}: ${error.message}`);
    }

    return { success: false, error };
  }
}
