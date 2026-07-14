import { demoReport } from "@/stubs/demo-report";
import type { CatReport } from "@/types/cat-report";

type AnalyzeResponse = {
  report: CatReport;
};

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function uriToDataUrl(uri: string): Promise<string> {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new ApiError("Could not load the selected image.", response.status);
  }

  const blob = await response.blob();

  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = () => reject(new ApiError("Could not prepare the image for upload.", 0));
    reader.readAsDataURL(blob);
  });
}

export async function analyzeCatPhoto(uri: string): Promise<CatReport> {
  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return demoReport;
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

  return payload.report;
}
