const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export const apiUrl = configuredApiUrl || "http://localhost:5000";

export async function readApiError(response: Response, fallback: string) {
  try {
    const data = await response.json();
    return data.message || fallback;
  } catch {
    return fallback;
  }
}
