import { analysisProvider } from "@/services/analysis-config";
import { analyzeWithBackend } from "@/services/providers/backend-provider";
import { ApiError } from "@/services/providers/errors";
import { analyzeWithLocalTest } from "@/services/providers/local-test-provider";
import { analyzeWithOllama } from "@/services/providers/ollama-provider";
import type { CatReport } from "@/types/cat-report";

export { ApiError };

export async function analyzeCatPhoto(uri: string): Promise<CatReport> {
  if (analysisProvider === "backend") {
    return analyzeWithBackend(uri);
  }

  if (analysisProvider === "ollama") {
    return analyzeWithOllama(uri);
  }

  return analyzeWithLocalTest(uri);
}
