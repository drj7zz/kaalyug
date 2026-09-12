const configuredMarketplaceApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

// Production requests use Vercel rewrites (configured in vercel.json). This
// keeps the browser same-origin and avoids CORS failures from the backend.
export const marketplaceApiUrl = configuredMarketplaceApiUrl || (import.meta.env.PROD ? "/marketplace-api" : "http://localhost:5000/api");
// Compatibility export for existing marketplace calls.
export const apiUrl = marketplaceApiUrl;

export async function readApiError(response: Response, fallback: string) {
  try {
    const data = await response.json();
    return data.error || data.message || fallback;
  } catch {
    return fallback;
  }
}

export function getApiData<T>(payload: T | { data?: T }) {
  return typeof payload === 'object' && payload !== null && 'data' in payload && (payload as { data?: T }).data
    ? (payload as { data: T }).data
    : payload as T;
}
