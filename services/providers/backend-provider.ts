import type { CatReport } from "@/types/cat-report";
import { ApiError } from "@/services/providers/errors";
import { uriToDataUrl } from "@/services/providers/image-data";

type AnalyzeResponse = {
  report: CatReport;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function analyzeWithBackend(uri: string): Promise<CatReport> {
  if (!API_URL) {
    throw new ApiError(
      "Backend mode is enabled but EXPO_PUBLIC_API_URL is missing. Add the API URL or switch back to local test mode.",
      500
    );
  }

  const imageDataUrl = await uriToDataUrl(uri);
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ imageDataUrl })
  });

  let payload: AnalyzeResponse | { error?: string };

  try {
    payload = (await response.json()) as AnalyzeResponse | { error?: string };
  } catch {
    throw new ApiError("The API returned an unreadable response.", response.status);
  }

  if (!response.ok) {
    throw new ApiError(
      "error" in payload && payload.error ? payload.error : `Request failed with HTTP ${response.status}.`,
      response.status
    );
  }

  if (!("report" in payload)) {
    throw new ApiError("The API response did not include a report payload.", response.status);
  }

  return payload.report;
}
